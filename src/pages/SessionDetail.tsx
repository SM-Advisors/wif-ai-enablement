import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/layout/AppShell";
import { SESSION_CONTENT } from "@/data/curriculumContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Lock,
  FileText,
  Download,
  Upload,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const statusConfig = {
  not_started: { label: "Not Started", color: "bg-slate-100 text-slate-600", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-700", icon: Clock },
  complete: { label: "Complete", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  locked: { label: "Locked", color: "bg-amber-100 text-amber-700", icon: Lock },
};

interface InstructorFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  created_at: string;
}

interface InstructorLink {
  id: string;
  title: string;
  url: string;
}

const SessionDetail = () => {
  const { number } = useParams<{ number: string }>();
  const sessionNumber = parseInt(number || "1", 10);
  const { user, isTrainer } = useAuth();

  const staticSession = SESSION_CONTENT.find(s => s.sessionNumber === sessionNumber);

  const [dbSessionId, setDbSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<"not_started" | "in_progress" | "complete" | "locked">("not_started");
  const [instructorNotes, setInstructorNotes] = useState("");
  const [files, setFiles] = useState<InstructorFile[]>([]);
  const [links, setLinks] = useState<InstructorLink[]>([]);
  const [userNotes, setUserNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      // Find DB session by session_number
      const { data: sessData } = await supabase
        .from("sessions")
        .select("id")
        .eq("session_number", sessionNumber)
        .maybeSingle();

      if (!sessData) {
        setIsLoading(false);
        return;
      }

      setDbSessionId(sessData.id);
      const sid = sessData.id;

      // Fetch all related data in parallel
      const [notesRes, contentRes, filesRes, linksRes, userNotesRes] = await Promise.all([
        supabase.from("session_notes").select("status").eq("session_id", sid).maybeSingle(),
        supabase.from("instructor_session_content").select("notes_markdown").eq("session_id", sid).maybeSingle(),
        supabase.from("instructor_session_files").select("*").eq("session_id", sid).order("created_at", { ascending: false }),
        supabase.from("instructor_session_links").select("*").eq("session_id", sid).order("created_at", { ascending: false }),
        supabase.from("user_session_notes").select("notes_markdown").eq("session_id", sid).eq("user_id", user.id).maybeSingle(),
      ]);

      if (notesRes.data) setStatus(notesRes.data.status);
      if (contentRes.data) setInstructorNotes(contentRes.data.notes_markdown || "");
      if (filesRes.data) setFiles(filesRes.data);
      if (linksRes.data) setLinks(linksRes.data);
      if (userNotesRes.data) setUserNotes(userNotesRes.data.notes_markdown || "");
    } catch (err) {
      console.error("Error fetching session data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [sessionNumber, user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleFileDownload = async (file: InstructorFile) => {
    const { data } = await supabase.storage.from("instructor-files").createSignedUrl(file.file_path, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !dbSessionId) return;

    const allowed = [".docx", ".xlsx", ".pdf", ".md", ".csv"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowed.includes(ext)) {
      toast({ title: "Unsupported file type", description: `Allowed: ${allowed.join(", ")}`, variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      const path = `${dbSessionId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("instructor-files").upload(path, file);
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("instructor_session_files").insert({
        session_id: dbSessionId,
        file_name: file.name,
        file_path: path,
        file_type: file.type || ext,
        file_size: file.size,
      });
      if (insertError) throw insertError;

      toast({ title: "File uploaded" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const saveUserNotes = async () => {
    if (!dbSessionId || !user) return;
    const { data: existing } = await supabase
      .from("user_session_notes")
      .select("id")
      .eq("session_id", dbSessionId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase.from("user_session_notes").update({ notes_markdown: userNotes }).eq("id", existing.id);
    } else {
      await supabase.from("user_session_notes").insert({
        session_id: dbSessionId,
        user_id: user.id,
        notes_markdown: userNotes,
      });
    }
    toast({ title: "Notes saved" });
  };

  if (!staticSession) {
    return (
      <AppShell>
        <div className="container max-w-4xl py-16 text-center">
          <h2 className="text-xl font-semibold text-slate-600">Session not found</h2>
          <Link to="/program" className="text-orange-500 hover:underline mt-4 inline-block">
            ← Back to Program
          </Link>
        </div>
      </AppShell>
    );
  }

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const fileIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-slate-400" />;
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <AppShell>
      {isLoading ? (
        <div className="container max-w-4xl py-8 px-4 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8 px-4">
            <div className="container max-w-4xl">
              <Link to="/program" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Program
              </Link>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-orange-400">{staticSession.sessionNumber}</span>
                    <div>
                      <h1 className="text-xl md:text-2xl font-bold">{staticSession.title}</h1>
                      <p className="text-slate-400 text-sm">{staticSession.theme}</p>
                    </div>
                  </div>
                </div>
                <Badge className={`${config.color} gap-1.5 flex-shrink-0`}>
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </Badge>
              </div>
            </div>
          </div>

          <div className="container max-w-4xl py-8 px-4 space-y-8">
            {/* Theme Description */}
            {staticSession.themeDescription && (
              <p className="text-slate-600 italic text-base">{staticSession.themeDescription}</p>
            )}

            {/* Outcomes */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Learning Outcomes</h2>
              <ul className="space-y-2">
                {staticSession.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Topics */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Core Topics</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {staticSession.topics.map((section, si) => (
                  <div key={si} className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">{section.title}</p>
                    <ul className="space-y-1">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-400">–</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Agenda */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Agenda</h2>
              <div className="space-y-2">
                {staticSession.agenda.map((a, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-slate-400 font-mono text-xs w-20 flex-shrink-0 mt-0.5">{a.time}</span>
                    <span className="text-slate-700">{a.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Homework */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                {staticSession.sessionNumber === 3 ? "Follow-Through Commitments" : "Homework"}
              </h2>
              <ul className="space-y-1.5">
                {staticSession.homework.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Instructor Notes */}
            {instructorNotes && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-3">Notes from the Instructor</h2>
                <div
                  className="prose prose-sm max-w-none text-slate-700"
                  dangerouslySetInnerHTML={{ __html: instructorNotes }}
                />
              </div>
            )}

            {/* Files */}
            {(files.length > 0 || isTrainer) && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Session Files</h2>
                  {isTrainer && (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".docx,.xlsx,.pdf,.md,.csv"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="gap-2"
                      >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        Upload File
                      </Button>
                    </>
                  )}
                </div>
                {files.length > 0 ? (
                  <div className="space-y-2">
                    {files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {fileIcon(file.file_type)}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{file.file_name}</p>
                            {file.file_size && (
                              <p className="text-xs text-slate-400">{formatSize(file.file_size)}</p>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleFileDownload(file)} className="gap-1.5">
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">No files uploaded yet.</p>
                )}
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Useful Links</h2>
                <div className="space-y-2">
                  {links.map(link => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* User Notes */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">My Notes</h2>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Add your personal notes for this session..."
                className="w-full min-h-32 p-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 resize-y"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={saveUserNotes} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Save Notes
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
};

export default SessionDetail;
