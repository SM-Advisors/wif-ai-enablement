import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppShell from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, FileDown, Loader2 } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useExportCurriculumPdf } from "@/hooks/useExportCurriculumPdf";
import SessionTab from "@/components/curriculum/SessionTab";
import SMAdvisorsHelpTab from "@/components/curriculum/SMAdvisorsHelpTab";
import { SESSION_CONTENT } from "@/data/curriculumContent";

interface Engagement {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
}

interface Session {
  id: string;
  session_number: number;
  date: string;
  duration_minutes: number;
  focus: string;
}

type SessionStatus = "not_started" | "in_progress" | "complete" | "locked";

interface SessionNote {
  id: string;
  session_id: string;
  status: SessionStatus;
  trainer_notes: string | null;
  client_notes: string | null;
  decisions: string | null;
  action_items: string | null;
  risks_open_questions: string | null;
  completed_at: string | null;
  updated_at: string;
}

const Curriculum = () => {
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionNotes, setSessionNotes] = useState<Record<string, SessionNote>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("session-1");
  const { exportPdf, isExporting } = useExportCurriculumPdf();

  const fetchData = useCallback(async () => {
    // Fetch engagement
    const { data: engagementData } = await supabase
      .from("engagements")
      .select("id, title, start_date, end_date")
      .single();

    if (engagementData) {
      setEngagement(engagementData as Engagement);

      // Fetch sessions and notes in parallel
      const [sessionsResult, notesResult] = await Promise.all([
        supabase
          .from("sessions")
          .select("*")
          .eq("engagement_id", engagementData.id)
          .order("session_number"),
        supabase.from("session_notes").select("*"),
      ]);

      if (sessionsResult.data) {
        setSessions(sessionsResult.data as Session[]);
      }

      if (notesResult.data) {
        const notesMap: Record<string, SessionNote> = {};
        notesResult.data.forEach((note) => {
          notesMap[note.session_id] = note as SessionNote;
        });
        setSessionNotes(notesMap);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sessionContentMap = {
    1: SESSION_CONTENT.session1,
    2: SESSION_CONTENT.session2,
    3: SESSION_CONTENT.session3,
    4: SESSION_CONTENT.session4,
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
        {/* Sticky Summary Header */}
        <div className="sticky top-14 md:top-16 z-40 bg-primary text-primary-foreground py-3 px-4">
          <div className="container max-w-5xl flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-xl font-bold mb-1">
                Curriculum
              </h1>
              <div className="flex flex-wrap gap-2 items-center text-xs md:text-sm text-primary-foreground/80">
                {engagement && (
                  <>
                    <Badge variant="outline" className="gap-1 text-xs border-primary-foreground/30 text-primary-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(engagement.start_date)} – {formatDate(engagement.end_date)}
                    </Badge>
                    <Badge variant="outline" className="gap-1 text-xs border-primary-foreground/30 text-primary-foreground">
                      <Clock className="h-3 w-3" />4 Sessions
                    </Badge>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportPdf(sessions, sessionNotes, engagement?.title || "Curriculum")
              }
              disabled={isExporting || sessions.length === 0}
              className="gap-2 bg-primary-foreground/15 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/25 hover:text-primary-foreground"
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
        <div className="flex-1 container max-w-5xl py-4 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List - Centered Card Style */}
            <div className="flex flex-wrap justify-center gap-2 pb-4 mb-6 border-b">
              {sessions.map((session) => {
                const note = sessionNotes[session.id];
                const isActive = activeTab === `session-${session.session_number}`;
                return (
                  <button
                    key={session.id}
                    onClick={() => setActiveTab(`session-${session.session_number}`)}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? "bg-secondary text-secondary-foreground border-secondary shadow-md"
                        : "bg-card text-muted-foreground border-border hover:border-accent hover:text-foreground hover:shadow-sm"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      Session {session.session_number}
                      {note?.status === "complete" && (
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                      )}
                      {note?.status === "locked" && (
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                      )}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setActiveTab("sm-advisors")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeTab === "sm-advisors"
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-md"
                    : "bg-card text-muted-foreground border-border hover:border-accent hover:text-foreground hover:shadow-sm"
                }`}
              >
                Other Ways SM Helps
              </button>
            </div>

            {/* Session Tabs */}
            {sessions.map((session) => {
              const content = sessionContentMap[session.session_number as keyof typeof sessionContentMap];
              return (
                <TabsContent key={session.id} value={`session-${session.session_number}`}>
                  <SessionTab
                    session={session}
                    content={content}
                    note={sessionNotes[session.id]}
                  />
                </TabsContent>
              );
            })}

            {/* SM Advisors Help Tab */}
            <TabsContent value="sm-advisors">
              <SMAdvisorsHelpTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
};

export default Curriculum;
