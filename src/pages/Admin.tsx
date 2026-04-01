import { useEffect, useState, useRef, useCallback } from "react";
import { Navigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Users,
  Settings,
  Upload,
  Link as LinkIcon,
  Plus,
  X,
  Loader2,
  FileText,
  ExternalLink,
  Book,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type SessionStatus = "not_started" | "in_progress" | "complete" | "locked";

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
  status: SessionStatus;
}

interface Profile {
  id: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

interface FileAttachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

// Program content is managed via static data - no DB table exists
// Remove ProgramSession and Program interfaces

const Admin = () => {
  const { isTrainer, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <AppShell>
        <div className="container max-w-5xl py-8 px-4">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!isTrainer) return <Navigate to="/" replace />;

  return (
    <AppShell>
      <div className="container max-w-5xl py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="notes" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Instructor Notes
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-2">
              <Settings className="h-4 w-4" />
              Session Status
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="program" className="gap-2">
              <Book className="h-4 w-4" />
              Program Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            <InstructorNotesAdmin />
          </TabsContent>
          <TabsContent value="sessions">
            <SessionStatusAdmin />
          </TabsContent>
          <TabsContent value="users">
            <UsersAdmin />
          </TabsContent>
          <TabsContent value="program">
            <ProgramContentAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
};

/* ─── Instructor Notes Admin ─── */
const InstructorNotesAdmin = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("sessions")
        .select("*")
        .order("session_number");
      if (data) {
        setSessions(data as Session[]);
        if (data.length > 0) setSelectedSession(data[0].id);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {sessions.map((s) => (
          <Button
            key={s.id}
            variant={selectedSession === s.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSession(s.id)}
            className={selectedSession === s.id ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            Session {s.session_number}: {s.focus}
          </Button>
        ))}
      </div>
      {selectedSession && <NotesEditor sessionId={selectedSession} />}
    </div>
  );
};

const NotesEditor = ({ sessionId }: { sessionId: string }) => {
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [contentId, setContentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [showLinkForm, setShowLinkForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const [contentRes, filesRes, linksRes] = await Promise.all([
        supabase.from("instructor_session_content").select("*").eq("session_id", sessionId).maybeSingle(),
        supabase.from("instructor_session_files").select("*").eq("session_id", sessionId).order("created_at", { ascending: false }),
        supabase.from("instructor_session_links").select("*").eq("session_id", sessionId).order("created_at", { ascending: false }),
      ]);
      if (contentRes.data) {
        setNotes(contentRes.data.notes_markdown || "");
        setContentId(contentRes.data.id);
      } else {
        setNotes("");
        setContentId(null);
      }
      setFiles(filesRes.data || []);
      setLinks(linksRes.data || []);
      setIsLoading(false);
    };
    fetchData();
  }, [sessionId]);

  const saveNotes = useCallback(async (content: string) => {
    if (contentId) {
      await supabase.from("instructor_session_content").update({ notes_markdown: content }).eq("id", contentId);
    } else {
      const { data } = await supabase.from("instructor_session_content").insert({ session_id: sessionId, notes_markdown: content }).select().single();
      if (data) setContentId(data.id);
    }
  }, [contentId, sessionId]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveNotes(value), 500);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop() || "png";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${sessionId}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("instructor-files").upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data, error: dbError } = await supabase.from("instructor_session_files").insert({ session_id: sessionId, file_name: file.name, file_path: filePath, file_type: file.type, file_size: file.size }).select().single();
      if (dbError) throw dbError;
      if (data) setFiles((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Upload error:", error);
    }
    finally { setIsUploading(false); }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files;
    if (fl) for (const f of fl) await uploadFile(f);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteFile = async (file: FileAttachment) => {
    await supabase.storage.from("instructor-files").remove([file.file_path]);
    await supabase.from("instructor_session_files").delete().eq("id", file.id);
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  const addLink = async () => {
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    const url = newLinkUrl.startsWith("http") ? newLinkUrl : `https://${newLinkUrl}`;
    const { data, error } = await supabase.from("instructor_session_links").insert({ session_id: sessionId, title: newLinkTitle.trim(), url }).select().single();
    if (!error && data) {
      setLinks((prev) => [data, ...prev]);
      setNewLinkTitle("");
      setNewLinkUrl("");
      setShowLinkForm(false);
    }
  };

  const deleteLink = async (id: string) => {
    await supabase.from("instructor_session_links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from("instructor-files").getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (isLoading) return <Skeleton className="h-48 w-full" />;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Edit Instructor Notes</CardTitle>
        <p className="text-xs text-muted-foreground">These notes are visible to all users</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Add notes for participants... Paste screenshots with Ctrl+V"
          className="min-h-64 font-mono text-sm"
        />

        <div className="flex items-center gap-2 flex-wrap">
          <input ref={fileInputRef} type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" multiple onChange={handleFileChange} className="hidden" />
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="gap-2">
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload File
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowLinkForm(!showLinkForm)} className="gap-2">
            <LinkIcon className="h-4 w-4" /> Add Link
          </Button>
        </div>

        {showLinkForm && (
          <div className="flex flex-col sm:flex-row gap-2 p-3 bg-muted rounded-lg">
            <Input placeholder="Link title" value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} className="text-sm" />
            <Input placeholder="https://..." value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} className="text-sm" />
            <Button size="sm" onClick={addLink} className="gap-1 shrink-0 bg-orange-600 hover:bg-orange-700"><Plus className="h-4 w-4" /> Add</Button>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attachments</Label>
            <div className="grid gap-2">
              {files.map((file) => {
                const url = getPublicUrl(file.file_path);
                return (
                  <div key={file.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    {file.file_type.startsWith("image/") && url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt={file.file_name} className="h-12 w-12 object-cover rounded" />
                      </a>
                    ) : (
                      <div className="h-12 w-12 flex items-center justify-center bg-background rounded">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium truncate block hover:underline">{file.file_name}</a>
                      <p className="text-xs text-muted-foreground">{file.file_size ? `${(file.file_size / 1024).toFixed(1)} KB` : ""}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => deleteFile(file)}><X className="h-4 w-4" /></Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {links.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Links</Label>
            <div className="grid gap-2">
              {links.map((link) => (
                <div key={link.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                  <div className="h-8 w-8 flex items-center justify-center bg-background rounded">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 text-sm font-medium truncate hover:underline text-orange-600">{link.title}</a>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => deleteLink(link.id)}><X className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">Changes are saved automatically.</p>
      </CardContent>
    </Card>
  );
};

/* ─── Session Status Admin ─── */
const SessionStatusAdmin = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [notes, setNotes] = useState<Record<string, SessionNote>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const [sessRes, notesRes] = await Promise.all([
        supabase.from("sessions").select("*").order("session_number"),
        supabase.from("session_notes").select("*"),
      ]);
      if (sessRes.data) setSessions(sessRes.data as Session[]);
      if (notesRes.data) {
        const map: Record<string, SessionNote> = {};
        notesRes.data.forEach((n) => { map[n.session_id] = n as SessionNote; });
        setNotes(map);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  const updateStatus = async (sessionId: string, status: SessionStatus) => {
    setSaving(sessionId);
    const existing = notes[sessionId];
    if (existing) {
      await supabase.from("session_notes").update({
        status,
        completed_at: status === "complete" ? new Date().toISOString() : null,
      }).eq("id", existing.id);
      setNotes((prev) => ({ ...prev, [sessionId]: { ...existing, status } }));
    } else {
      const { data } = await supabase.from("session_notes").insert({
        session_id: sessionId,
        status,
        completed_at: status === "complete" ? new Date().toISOString() : null,
      }).select().single();
      if (data) setNotes((prev) => ({ ...prev, [sessionId]: data as SessionNote }));
    }
    setSaving(null);
  };

  if (isLoading) return <Skeleton className="h-48 w-full" />;

  const statusOptions: { value: SessionStatus; label: string; color: string }[] = [
    { value: "not_started", label: "Not Started", color: "bg-slate-100 text-slate-700" },
    { value: "in_progress", label: "In Progress", color: "bg-blue-100 text-blue-700" },
    { value: "complete", label: "Complete", color: "bg-green-100 text-green-700" },
    { value: "locked", label: "Locked", color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="grid gap-4">
      {sessions.map((s) => {
        const current = notes[s.id]?.status || "not_started";
        return (
          <Card key={s.id}>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4">
              <div>
                <p className="font-medium">Session {s.session_number}: {s.focus}</p>
                <p className="text-sm text-muted-foreground">{s.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={current} onValueChange={(v) => updateStatus(s.id, v as SessionStatus)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <Badge className={opt.color}>{opt.label}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {saving === s.id && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

/* ─── Users Admin ─── */
const UsersAdmin = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at");
      if (data) setProfiles(data as Profile[]);
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (isLoading) return <Skeleton className="h-48 w-full" />;

  return (
    <div className="grid gap-3">
      {profiles.map((p) => (
        <Card key={p.id}>
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">{p.full_name || "No name"}</p>
              <p className="text-xs text-muted-foreground text-slate-500">User ID: {p.id.slice(0, 8)}</p>
            </div>
            <Badge variant={p.role === "trainer" ? "default" : "secondary"} className={p.role === "trainer" ? "bg-orange-600 hover:bg-orange-700" : ""}>
              {p.role === "trainer" ? "Trainer" : "Client"}
            </Badge>
          </CardContent>
        </Card>
      ))}
      {profiles.length === 0 && (
        <p className="text-sm text-muted-foreground">No users found.</p>
      )}
    </div>
  );
};

/* ─── Program Content Admin ─── */
const ProgramContentAdmin = () => {
  const [program, setProgram] = useState<Program | null>(null);
  const [sessions, setSessions] = useState<ProgramSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [progRes, sessRes] = await Promise.all([
        supabase.from("program").select("*").single(),
        supabase.from("sessions").select("*").order("session_number"),
      ]);
      if (progRes.data) setProgram(progRes.data as Program);
      if (sessRes.data) setSessions(sessRes.data as ProgramSession[]);
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (isLoading) return <Skeleton className="h-96 w-full" />;

  return (
    <div className="space-y-6">
      {program && <ProgramEditor program={program} onUpdate={setProgram} />}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Sessions</h2>
        {sessions.map((session) => (
          <SessionEditor key={session.id} session={session} onUpdate={(updated) => setSessions(sessions.map(s => s.id === updated.id ? updated : s))} />
        ))}
      </div>
    </div>
  );
};

const ProgramEditor = ({ program, onUpdate }: { program: Program; onUpdate: (p: Program) => void }) => {
  const [name, setName] = useState(program.name);
  const [summary, setSummary] = useState(program.short_summary);
  const [narrative, setNarrative] = useState(program.narrative_arc);
  const [activeSection, setActiveSection] = useState<"name" | "summary" | "narrative" | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const saveSection = async (section: string, value: string) => {
    setSaving(section);
    try {
      const updateData: any = {};
      if (section === "name") updateData.name = value;
      if (section === "summary") updateData.short_summary = value;
      if (section === "narrative") updateData.narrative_arc = value;

      const { data } = await supabase.from("program").update(updateData).eq("id", program.id).select().single();
      if (data) {
        onUpdate(data as Program);
        setActiveSection(null);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card className="border-orange-200">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-lg">Program Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Program Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Program Name</Label>
          {activeSection === "name" ? (
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={() => saveSection("name", name)}
                disabled={saving === "name"}
                className="bg-orange-600 hover:bg-orange-700 gap-1"
              >
                {saving === "name" && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setName(program.name);
                  setActiveSection(null);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <p className="text-sm">{program.name}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveSection("name")}
                className="text-orange-600"
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Short Summary */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Short Summary</Label>
          {activeSection === "summary" ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="min-h-24 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => saveSection("summary", summary)}
                  disabled={saving === "summary"}
                  className="bg-orange-600 hover:bg-orange-700 gap-1"
                >
                  {saving === "summary" && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSummary(program.short_summary);
                    setActiveSection(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg gap-4">
              <p className="text-sm text-muted-foreground">{program.short_summary || "No summary"}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveSection("summary")}
                className="text-orange-600 shrink-0"
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Narrative Arc */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Narrative Arc</Label>
          {activeSection === "narrative" ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                className="min-h-32 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => saveSection("narrative", narrative)}
                  disabled={saving === "narrative"}
                  className="bg-orange-600 hover:bg-orange-700 gap-1"
                >
                  {saving === "narrative" && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNarrative(program.narrative_arc);
                    setActiveSection(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg gap-4">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{program.narrative_arc || "No narrative arc"}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveSection("narrative")}
                className="text-orange-600 shrink-0"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const SessionEditor = ({ session, onUpdate }: { session: ProgramSession; onUpdate: (s: ProgramSession) => void }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const [title, setTitle] = useState(session.title);
  const [theme, setTheme] = useState(session.theme);
  const [themeDesc, setThemeDesc] = useState(session.theme_description || "");
  const [outcomes, setOutcomes] = useState(JSON.stringify(session.outcomes || [], null, 2));
  const [topics, setTopics] = useState(JSON.stringify(session.topics || [], null, 2));
  const [agenda, setAgenda] = useState(JSON.stringify(session.agenda || [], null, 2));
  const [homework, setHomework] = useState(JSON.stringify(session.homework || [], null, 2));

  const saveField = async (field: string, value: any) => {
    setSaving(field);
    try {
      const updateData: any = { id: session.id };
      const parseValue = (v: any) => {
        if (typeof v === "string" && (field === "outcomes" || field === "topics" || field === "agenda" || field === "homework")) {
          try {
            return JSON.parse(v);
          } catch {
            console.error("JSON parse error");
            return [];
          }
        }
        return v;
      };

      updateData[field] = parseValue(value);
      const { data } = await supabase.from("sessions").update(updateData).eq("id", session.id).select().single();
      if (data) {
        const updated = { ...session, ...data };
        onUpdate(updated as ProgramSession);
        setEditingField(null);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card>
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-base">Session {session.session_number}: {session.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Title */}
        <EditableField
          label="Title"
          value={title}
          onEdit={() => setEditingField("title")}
          isEditing={editingField === "title"}
          onChange={setTitle}
          onSave={() => saveField("title", title)}
          isSaving={saving === "title"}
          onCancel={() => {
            setTitle(session.title);
            setEditingField(null);
          }}
        />

        {/* Theme */}
        <EditableField
          label="Theme"
          value={theme}
          onEdit={() => setEditingField("theme")}
          isEditing={editingField === "theme"}
          onChange={setTheme}
          onSave={() => saveField("theme", theme)}
          isSaving={saving === "theme"}
          onCancel={() => {
            setTheme(session.theme);
            setEditingField(null);
          }}
        />

        {/* Theme Description */}
        <EditableField
          label="Theme Description"
          value={themeDesc}
          onEdit={() => setEditingField("theme_description")}
          isEditing={editingField === "theme_description"}
          onChange={setThemeDesc}
          onSave={() => saveField("theme_description", themeDesc)}
          isSaving={saving === "theme_description"}
          onCancel={() => {
            setThemeDesc(session.theme_description || "");
            setEditingField(null);
          }}
          isTextarea
        />

        {/* Outcomes */}
        <EditableJSONField
          label="Outcomes"
          value={outcomes}
          onEdit={() => setEditingField("outcomes")}
          isEditing={editingField === "outcomes"}
          onChange={setOutcomes}
          onSave={() => saveField("outcomes", outcomes)}
          isSaving={saving === "outcomes"}
          onCancel={() => {
            setOutcomes(JSON.stringify(session.outcomes || [], null, 2));
            setEditingField(null);
          }}
        />

        {/* Topics */}
        <EditableJSONField
          label="Topics"
          value={topics}
          onEdit={() => setEditingField("topics")}
          isEditing={editingField === "topics"}
          onChange={setTopics}
          onSave={() => saveField("topics", topics)}
          isSaving={saving === "topics"}
          onCancel={() => {
            setTopics(JSON.stringify(session.topics || [], null, 2));
            setEditingField(null);
          }}
        />

        {/* Agenda */}
        <EditableJSONField
          label="Agenda"
          value={agenda}
          onEdit={() => setEditingField("agenda")}
          isEditing={editingField === "agenda"}
          onChange={setAgenda}
          onSave={() => saveField("agenda", agenda)}
          isSaving={saving === "agenda"}
          onCancel={() => {
            setAgenda(JSON.stringify(session.agenda || [], null, 2));
            setEditingField(null);
          }}
        />

        {/* Homework */}
        <EditableJSONField
          label="Homework"
          value={homework}
          onEdit={() => setEditingField("homework")}
          isEditing={editingField === "homework"}
          onChange={setHomework}
          onSave={() => saveField("homework", homework)}
          isSaving={saving === "homework"}
          onCancel={() => {
            setHomework(JSON.stringify(session.homework || [], null, 2));
            setEditingField(null);
          }}
        />
      </CardContent>
    </Card>
  );
};

interface EditableFieldProps {
  label: string;
  value: string;
  onEdit: () => void;
  isEditing: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
  onCancel: () => void;
  isTextarea?: boolean;
}

const EditableField = ({
  label,
  value,
  onEdit,
  isEditing,
  onChange,
  onSave,
  isSaving,
  onCancel,
  isTextarea,
}: EditableFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          {isTextarea ? (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="min-h-24 text-sm"
            />
          ) : (
            <Input value={value} onChange={(e) => onChange(e.target.value)} className="text-sm" />
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-700 gap-1"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <p className="text-sm">{value || "-"}</p>
          <Button size="sm" variant="ghost" onClick={onEdit} className="text-orange-600">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

interface EditableJSONFieldProps {
  label: string;
  value: string;
  onEdit: () => void;
  isEditing: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
  onCancel: () => void;
}

const EditableJSONField = ({
  label,
  value,
  onEdit,
  isEditing,
  onChange,
  onSave,
  isSaving,
  onCancel,
}: EditableJSONFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-32 font-mono text-xs"
            placeholder='["item1", "item2"]'
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-700 gap-1"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg gap-4">
          <pre className="text-xs text-muted-foreground overflow-auto max-h-32 flex-1">
            {value}
          </pre>
          <Button size="sm" variant="ghost" onClick={onEdit} className="text-orange-600 shrink-0">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Admin;
