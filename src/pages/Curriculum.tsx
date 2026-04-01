import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SESSION_CONTENT } from "@/data/curriculumContent";
import { useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, FileDown, Loader2, CheckCircle2, Clock, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useExportCurriculumPdf } from "@/hooks/useExportCurriculumPdf";

// Types aligned with new schema
interface Session {
  id: string;
  session_number: number;
  focus: string;
  duration_minutes: number;
  engagement_id: string;
  date: string;
  created_at: string;
}

interface SessionNote {
  id: string;
  session_id: string;
  status: "not_started" | "in_progress" | "complete" | "locked";
  trainer_notes: string | null;
  client_notes: string | null;
  decisions: string | null;
  action_items: string | null;
  risks_open_questions: string | null;
  completed_at: string | null;
  updated_at: string;
  updated_by: string | null;
}

interface UserSessionNote {
  id: string;
  session_id: string;
  user_id: string;
  notes_markdown: string | null;
  created_at: string;
  updated_at: string;
}

interface InstructorContent {
  id: string;
  session_id: string;
  notes_markdown: string | null;
}

interface InstructorFile {
  id: string;
  session_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  created_at: string;
}

interface InstructorLink {
  id: string;
  session_id: string;
  title: string;
  url: string;
  created_at: string;
}

const statusConfig = {
  not_started: {
    label: "Not Started",
    color: "bg-slate-100 text-slate-700",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  complete: {
    label: "Complete",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  locked: {
    label: "Locked",
    color: "bg-amber-100 text-amber-700",
    icon: Lock,
  },
};

const Curriculum = () => {
  const { user, isTrainer } = useAuth();
  const { exportPdf, isExporting } = useExportCurriculumPdf();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionNotes, setSessionNotes] = useState<Record<string, SessionNote>>({});
  const [userSessionNotes, setUserSessionNotes] = useState<Record<string, UserSessionNote>>({});
  const [instructorContent, setInstructorContent] = useState<Record<string, InstructorContent>>({});
  const [instructorFiles, setInstructorFiles] = useState<Record<string, InstructorFile[]>>({});
  const [instructorLinks, setInstructorLinks] = useState<Record<string, InstructorLink[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("session-1");
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({});

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Fetch all sessions (order by session_number, should get 3 sessions)
      const { data: sessionsData, error: sessionsError } = await supabase
        .from("sessions")
        .select("*")
        .order("session_number", { ascending: true });

      if (sessionsError) throw sessionsError;
      if (sessionsData) {
        setSessions(sessionsData as Session[]);
      }

      if (!sessionsData || sessionsData.length === 0) {
        setIsLoading(false);
        return;
      }

      const sessionIds = sessionsData.map((s) => s.id);

      // Fetch session notes (status tracking)
      const { data: notesData, error: notesError } = await supabase
        .from("session_notes")
        .select("*")
        .in("session_id", sessionIds);

      if (notesError) throw notesError;
      if (notesData) {
        const notesMap: Record<string, SessionNote> = {};
        notesData.forEach((note) => {
          notesMap[note.session_id] = note as SessionNote;
        });
        setSessionNotes(notesMap);
      }

      // Fetch user session notes (personal notes)
      if (user) {
        const { data: userNotesData, error: userNotesError } = await supabase
          .from("user_session_notes")
          .select("*")
          .eq("user_id", user.id)
          .in("session_id", sessionIds);

        if (userNotesError) throw userNotesError;
        if (userNotesData) {
          const userNotesMap: Record<string, UserSessionNote> = {};
          userNotesData.forEach((note) => {
            userNotesMap[note.session_id] = note as UserSessionNote;
          });
          setUserSessionNotes(userNotesMap);
        }
      }

      // Fetch instructor content
      const { data: contentData, error: contentError } = await supabase
        .from("instructor_session_content")
        .select("*")
        .in("session_id", sessionIds);

      if (contentError) throw contentError;
      if (contentData) {
        const contentMap: Record<string, InstructorContent> = {};
        contentData.forEach((item) => {
          contentMap[item.session_id] = item as InstructorContent;
        });
        setInstructorContent(contentMap);
      }

      // Fetch instructor files
      const { data: filesData, error: filesError } = await supabase
        .from("instructor_session_files")
        .select("*")
        .in("session_id", sessionIds)
        .order("created_at", { ascending: false });

      if (filesError) throw filesError;
      if (filesData) {
        const filesMap: Record<string, InstructorFile[]> = {};
        filesData.forEach((file) => {
          if (!filesMap[file.session_id]) filesMap[file.session_id] = [];
          filesMap[file.session_id].push(file as InstructorFile);
        });
        setInstructorFiles(filesMap);
      }

      // Fetch instructor links
      const { data: linksData, error: linksError } = await supabase
        .from("instructor_session_links")
        .select("*")
        .in("session_id", sessionIds)
        .order("created_at", { ascending: false });

      if (linksError) throw linksError;
      if (linksData) {
        const linksMap: Record<string, InstructorLink[]> = {};
        linksData.forEach((link) => {
          if (!linksMap[link.session_id]) linksMap[link.session_id] = [];
          linksMap[link.session_id].push(link as InstructorLink);
        });
        setInstructorLinks(linksMap);
      }
    } catch (error) {
      console.error("Error fetching curriculum data:", error);
      toast({
        title: "Error loading curriculum",
        description: "Could not load curriculum data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Save personal notes
  const saveUserNotes = useCallback(
    async (sessionId: string, notes: string) => {
      if (!user) return;

      setSavingNotes((prev) => ({ ...prev, [sessionId]: true }));

      try {
        const existing = userSessionNotes[sessionId];

        if (existing) {
          // Update existing
          const { error } = await supabase
            .from("user_session_notes")
            .update({
              notes_markdown: notes,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);

          if (error) throw error;
        } else {
          // Create new
          const { error } = await supabase.from("user_session_notes").insert({
            session_id: sessionId,
            user_id: user.id,
            notes_markdown: notes,
          });

          if (error) throw error;
        }

        // Update local state
        setUserSessionNotes((prev) => ({
          ...prev,
          [sessionId]: {
            id: existing?.id || Math.random().toString(),
            session_id: sessionId,
            user_id: user.id,
            notes_markdown: notes,
            created_at: existing?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        }));

        toast({
          title: "Notes saved",
          description: "Your personal notes have been saved.",
        });
      } catch (error) {
        console.error("Error saving notes:", error);
        toast({
          title: "Error saving notes",
          description: "Could not save your notes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setSavingNotes((prev) => ({ ...prev, [sessionId]: false }));
      }
    },
    [user, userSessionNotes]
  );

  // Update session status (trainer only)
  const updateSessionStatus = useCallback(
    async (sessionId: string, newStatus: "not_started" | "in_progress" | "complete" | "locked") => {
      if (!isTrainer) return;

      try {
        const existing = sessionNotes[sessionId];

        if (existing) {
          const { error } = await supabase
            .from("session_notes")
            .update({
              status: newStatus,
              updated_at: new Date().toISOString(),
              updated_by: user?.id,
            })
            .eq("id", existing.id);

          if (error) throw error;
        } else {
          const { error } = await supabase.from("session_notes").insert({
            session_id: sessionId,
            status: newStatus,
            updated_by: user?.id,
          });

          if (error) throw error;
        }

        // Update local state
        setSessionNotes((prev) => ({
          ...prev,
          [sessionId]: {
            id: existing?.id || Math.random().toString(),
            session_id: sessionId,
            status: newStatus,
            trainer_notes: existing?.trainer_notes || null,
            client_notes: existing?.client_notes || null,
            decisions: existing?.decisions || null,
            action_items: existing?.action_items || null,
            risks_open_questions: existing?.risks_open_questions || null,
            completed_at: newStatus === "complete" ? new Date().toISOString() : existing?.completed_at || null,
            updated_at: new Date().toISOString(),
            updated_by: user?.id || null,
          },
        }));

        toast({
          title: "Status updated",
          description: `Session status changed to ${statusConfig[newStatus].label}.`,
        });
      } catch (error) {
        console.error("Error updating status:", error);
        toast({
          title: "Error updating status",
          description: "Could not update session status. Please try again.",
          variant: "destructive",
        });
      }
    },
    [isTrainer, user?.id, sessionNotes]
  );

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const renderJsonArray = (arr: any) => {
    if (!arr) return [];
    if (Array.isArray(arr)) return arr;
    if (typeof arr === "object") {
      // Handle JSON object that might represent a list
      return Object.values(arr).filter((v) => typeof v === "string");
    }
    return [];
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="container max-w-5xl py-6 px-4 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Sticky Header */}
        <div className="sticky top-14 md:top-16 z-40 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4">
          <div className="container max-w-5xl flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-xl font-bold mb-1">Women in Finance Curriculum</h1>
              <div className="flex flex-wrap gap-2 items-center text-xs md:text-sm text-white/80">
                <Badge variant="outline" className="gap-1 text-xs border-white/30 text-white">
                  <Calendar className="h-3 w-3" />
                  3 Sessions
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportPdf("Women in Finance Curriculum", [], Object.values(sessionNotes))
              }
              disabled={isExporting || sessions.length === 0}
              className="gap-2 bg-white/15 border-white/40 text-white hover:bg-white/25 hover:text-white"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileDown className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{isExporting ? "Exporting…" : "Export PDF"}</span>
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 container max-w-5xl py-6 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List */}
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {sessions.map((session) => {
                const note = sessionNotes[session.id];
                const status = note?.status || "not_started";
                const statusInfo = statusConfig[status];
                const StatusIcon = statusInfo.icon;

                return (
                  <TabsTrigger
                    key={session.id}
                    value={`session-${session.session_number}`}
                    className="relative flex items-center gap-2"
                  >
                    <span>Session {session.session_number}</span>
                    {status === "complete" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    {status === "locked" && <Lock className="h-4 w-4 text-amber-600" />}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Session Tabs Content */}
            {sessions.map((session) => {
              const note = sessionNotes[session.id];
              const status = note?.status || "not_started";
              const statusInfo = statusConfig[status];
              const StatusIcon = statusInfo.icon;
              const userNotes = userSessionNotes[session.id];
              const [noteValue, setNoteValue] = useState(userNotes?.notes_markdown || "");
              const content = instructorContent[session.id];
              const files = instructorFiles[session.id] || [];
              const links = instructorLinks[session.id] || [];

              const staticSession = SESSION_CONTENT.find(s => s.sessionNumber === session.session_number);

              return (
                <TabsContent
                  key={session.id}
                  value={`session-${session.session_number}`}
                  className="space-y-6 mt-0"
                >
                  {/* Session Header */}
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{staticSession?.title || session.focus}</h2>
                        <p className="text-sm text-slate-600 mb-3">
                          <strong>Theme:</strong> {staticSession?.theme || session.focus}
                        </p>
                        {staticSession?.themeDescription && (
                          <p className="text-sm text-slate-700 italic">{staticSession.themeDescription}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${statusInfo.color} gap-1.5`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                        {isTrainer && (
                          <Select value={status} onValueChange={(val: any) => updateSessionStatus(session.id, val)}>
                            <SelectTrigger className="w-40 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        <p className="text-xs text-slate-500">{formatDuration(session.duration_minutes)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Session Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Outcomes */}
                      {outcomes.length > 0 && (
                        <div className="border border-slate-200 rounded-lg p-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b border-orange-200">
                            Learning Outcomes
                          </h3>
                          <ul className="space-y-2">
                            {outcomes.map((outcome: string, idx: number) => (
                              <li key={idx} className="flex gap-2 text-sm text-slate-700">
                                <span className="text-orange-500 font-bold">•</span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Topics */}
                      {topics.length > 0 && (
                        <div className="border border-slate-200 rounded-lg p-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b border-orange-200">
                            Core Topics
                          </h3>
                          <ul className="space-y-2">
                            {topics.map((topic: string, idx: number) => (
                              <li key={idx} className="flex gap-2 text-sm text-slate-700">
                                <span className="text-orange-500 font-bold">▪</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Agenda */}
                      {agenda.length > 0 && (
                        <div className="border border-slate-200 rounded-lg p-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b border-orange-200">
                            Agenda
                          </h3>
                          <ol className="space-y-2">
                            {agenda.map((item: string, idx: number) => (
                              <li key={idx} className="flex gap-2 text-sm text-slate-700">
                                <span className="text-orange-500 font-bold min-w-6">{idx + 1}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Homework */}
                      {homework.length > 0 && (
                        <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                          <h3 className="text-sm font-semibold text-blue-900 mb-3 pb-2 border-b border-blue-200">
                            Follow-Through Work
                          </h3>
                          <ul className="space-y-2">
                            {homework.map((item: string, idx: number) => (
                              <li key={idx} className="flex gap-2 text-sm text-blue-800">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instructor Content */}
                  {(content?.notes_markdown || files.length > 0 || links.length > 0) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                      <h3 className="text-sm font-semibold text-amber-900 mb-4">Instructor Resources</h3>

                      {content?.notes_markdown && (
                        <div className="mb-4 p-3 bg-white rounded border border-amber-100">
                          <p className="text-sm text-slate-700 whitespace-pre-line">{content.notes_markdown}</p>
                        </div>
                      )}

                      {files.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-amber-800 mb-2">Attachments:</p>
                          <ul className="space-y-1">
                            {files.map((file) => (
                              <li key={file.id} className="text-sm">
                                <a
                                  href={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/instructor-files/${file.file_path}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-orange-600 hover:text-orange-700 underline flex items-center gap-1"
                                >
                                  📎 {file.file_name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {links.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-amber-800 mb-2">Links:</p>
                          <ul className="space-y-1">
                            {links.map((link) => (
                              <li key={link.id} className="text-sm">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-orange-600 hover:text-orange-700 underline flex items-center gap-1"
                                >
                                  🔗 {link.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Personal Notes Section */}
                  {user && (
                    <div className="border border-slate-200 rounded-lg p-6">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">My Notes</h3>
                      <Textarea
                        placeholder="Add your personal notes for this session..."
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                        className="min-h-32 text-sm"
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setNoteValue(userNotes?.notes_markdown || "")}
                        >
                          Reset
                        </Button>
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => saveUserNotes(session.id, noteValue)}
                          disabled={savingNotes[session.id]}
                        >
                          {savingNotes[session.id] ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Notes"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
};

export default Curriculum;
