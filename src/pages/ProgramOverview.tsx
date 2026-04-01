import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/layout/AppShell";
import { PROGRAM, SESSION_CONTENT } from "@/data/curriculumContent";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, CheckCircle2, Lock, ArrowRight } from "lucide-react";

interface SessionNote {
  session_id: string;
  status: "not_started" | "in_progress" | "complete" | "locked";
}

interface DBSession {
  id: string;
  session_number: number;
  focus: string;
  duration_minutes: number;
}

const statusConfig = {
  not_started: { label: "Not Started", color: "bg-slate-100 text-slate-600", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-700", icon: Clock },
  complete: { label: "Complete", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  locked: { label: "Locked", color: "bg-amber-100 text-amber-700", icon: Lock },
};

const ProgramOverview = () => {
  const { user } = useAuth();
  const [dbSessions, setDbSessions] = useState<DBSession[]>([]);
  const [sessionNotes, setSessionNotes] = useState<Record<string, SessionNote>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { data: sessionsData } = await supabase
        .from("sessions")
        .select("id, session_number, focus, duration_minutes")
        .order("session_number");

      if (sessionsData) {
        setDbSessions(sessionsData);
        const sessionIds = sessionsData.map(s => s.id);
        const { data: notesData } = await supabase
          .from("session_notes")
          .select("session_id, status")
          .in("session_id", sessionIds);

        if (notesData) {
          const map: Record<string, SessionNote> = {};
          notesData.forEach(n => { map[n.session_id] = n; });
          setSessionNotes(map);
        }
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const cardColors = [
    "border-l-orange-500 hover:shadow-orange-100",
    "border-l-slate-600 hover:shadow-slate-100",
    "border-l-orange-400 hover:shadow-orange-100",
  ];

  return (
    <AppShell>
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 px-4">
        <div className="container max-w-4xl">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-4">
            {SESSION_CONTENT.length}-Session Program
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{PROGRAM.name}</h1>
          <p className="text-slate-300 leading-relaxed max-w-2xl text-sm md:text-base">
            {PROGRAM.narrativeArc}
          </p>
        </div>
      </div>

      {/* Session Cards */}
      <div className="container max-w-4xl py-8 px-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {SESSION_CONTENT.map((s, i) => {
              const db = dbSessions.find(d => d.session_number === s.sessionNumber);
              const note = db ? sessionNotes[db.id] : undefined;
              const status = note?.status || "not_started";
              const config = statusConfig[status];
              const StatusIcon = config.icon;

              return (
                <Link
                  key={s.sessionNumber}
                  to={`/session/${s.sessionNumber}`}
                  className={`block rounded-xl border border-l-4 ${cardColors[i]} bg-white p-6 transition-all hover:shadow-lg group`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-slate-300">{s.sessionNumber}</span>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">
                            {s.title}
                          </h3>
                          <p className="text-sm text-slate-500">{s.theme}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{s.themeDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs gap-1">
                          <Clock className="h-3 w-3" />
                          {s.durationMinutes} min
                        </Badge>
                        <Badge className={`text-xs gap-1 ${config.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {config.label}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default ProgramOverview;
