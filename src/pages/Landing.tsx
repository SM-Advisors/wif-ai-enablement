import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { PROGRAM, SESSION_CONTENT, SessionContent, TopicSection } from "@/data/curriculumContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, BookOpen, LogIn, ChevronDown, ChevronUp } from "lucide-react";
import smAdvisorsLogo from "@/assets/sm-advisors-logo-new.webp";

interface ProgramData {
  name: string;
  short_summary: string | null;
  narrative_arc: string | null;
}

interface SessionData {
  session_number: number;
  title: string;
  theme: string;
  theme_description: string | null;
  outcomes: string[];
  topics: { sections: Array<{ title: string; items: string[] }> };
  agenda: Array<{ time: string; description: string }>;
  homework: string[];
  duration_minutes: number;
}

const Landing = () => {
  const { user } = useAuth();
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"summary" | "full">("summary");
  const [copied, setCopied] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(new Set([1]));

  useEffect(() => {
    // Use static content since DB doesn't have program table or session content columns
    setProgram({
      name: PROGRAM.name,
      short_summary: PROGRAM.shortSummary,
      narrative_arc: PROGRAM.narrativeArc,
    });
    setSessions(SESSION_CONTENT.map(s => ({
      session_number: s.sessionNumber,
      title: s.title,
      theme: s.theme,
      theme_description: s.themeDescription,
      outcomes: s.outcomes,
      topics: { sections: s.topics },
      agenda: s.agenda,
      homework: s.homework,
      duration_minutes: s.durationMinutes,
    })));
    setLoading(false);
  }, []);


  const toggleSession = (num: number) => {
    setExpandedSessions(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const buildPlainText = (): string => {
    if (!program || sessions.length === 0) return "";
    const lines: string[] = [];

    lines.push(program.name.toUpperCase());
    lines.push("=".repeat(program.name.length));
    lines.push("");

    if (program.short_summary) {
      lines.push(program.short_summary);
      lines.push("");
    }

    if (program.narrative_arc) {
      lines.push("PROGRAM NARRATIVE");
      lines.push("-".repeat(17));
      lines.push(program.narrative_arc);
      lines.push("");
    }

    sessions.forEach((s) => {
      lines.push(`SESSION ${s.session_number}: ${s.title.toUpperCase()}`);
      lines.push("-".repeat(40));
      lines.push(`Theme: ${s.theme}`);
      if (s.theme_description) lines.push(s.theme_description);
      lines.push("");

      lines.push("OUTCOMES");
      s.outcomes.forEach(o => lines.push(`• ${o}`));
      lines.push("");

      lines.push("CORE TOPICS");
      s.topics?.sections?.forEach(section => {
        lines.push(`  ${section.title}`);
        section.items.forEach(item => lines.push(`    – ${item}`));
      });
      lines.push("");

      lines.push("90-MINUTE SAMPLE AGENDA");
      s.agenda.forEach(a => lines.push(`  ${a.time}  ${a.description}`));
      lines.push("");

      lines.push(s.session_number === 3 ? "FOLLOW-THROUGH COMMITMENT" : "HOMEWORK");
      s.homework.forEach(h => lines.push(`• ${h}`));
      lines.push("");
      lines.push("");
    });

    return lines.join("\n");
  };

  const handleCopy = async () => {
    const text = buildPlainText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sessionColors = ["bg-orange-500", "bg-slate-700", "bg-orange-400"];
  const sessionBg = ["bg-orange-50 border-orange-100", "bg-slate-50 border-slate-100", "bg-orange-50 border-orange-100"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <img src={smAdvisorsLogo} alt="SM Advisors" className="h-7 w-auto object-contain" />
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/curriculum">
                <Button variant="outline" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Enter Curriculum
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Hero */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 font-medium">3-Session Program</Badge>
              <Badge variant="outline" className="text-slate-500">90 Minutes Each</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {program?.name}
            </h1>
            {program?.short_summary && (
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                {program.short_summary}
              </p>
            )}
          </div>

          {/* Actions bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex rounded-lg border border-slate-200 overflow-hidden">
              <button
                onClick={() => setView("summary")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  view === "summary" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setView("full")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  view === "full" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Full Description
              </button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 ml-auto"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </div>

          {/* SUMMARY VIEW */}
          {view === "summary" && (
            <div className="space-y-8">
              {/* Narrative Arc */}
              {program?.narrative_arc && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Program Narrative</h2>
                  <p className="text-slate-700 leading-relaxed">{program.narrative_arc}</p>
                </div>
              )}

              {/* Session summary cards */}
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Three Sessions</h2>
                <div className="grid gap-4">
                  {sessions.map((s, i) => (
                    <div key={s.session_number} className={`rounded-xl border p-5 ${sessionBg[i]}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-9 h-9 rounded-full ${sessionColors[i]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {s.session_number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{s.theme}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {s.outcomes.slice(0, 3).map((o, oi) => (
                              <span key={oi} className="inline-block bg-white border border-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full">
                                {o}
                              </span>
                            ))}
                            {s.outcomes.length > 3 && (
                              <span className="inline-block text-slate-400 text-xs px-1 py-1">+{s.outcomes.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FULL DESCRIPTION VIEW */}
          {view === "full" && (
            <div className="space-y-6">
              {/* Narrative */}
              {program?.narrative_arc && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Program Narrative</h2>
                  <p className="text-slate-700 leading-relaxed">{program.narrative_arc}</p>
                </div>
              )}

              {/* Sessions */}
              {sessions.map((s, i) => (
                <div key={s.session_number} className="rounded-xl border border-slate-200 overflow-hidden">
                  {/* Session header — always visible, clickable to expand */}
                  <button
                    className="w-full text-left"
                    onClick={() => toggleSession(s.session_number)}
                  >
                    <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${sessionColors[i]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {s.session_number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-semibold text-slate-900 text-lg">{s.title}</h3>
                            <Badge variant="outline" className="text-xs text-slate-400">{s.duration_minutes} min</Badge>
                          </div>
                          <p className="text-slate-500 text-sm">{s.theme}</p>
                        </div>
                      </div>
                      {expandedSessions.has(s.session_number)
                        ? <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                        : <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      }
                    </div>
                  </button>

                  {/* Expanded session content */}
                  {expandedSessions.has(s.session_number) && (
                    <div className="border-t border-slate-200 p-5 space-y-6">
                      {s.theme_description && (
                        <p className="text-slate-600 italic text-sm">{s.theme_description}</p>
                      )}

                      {/* Outcomes */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Outcomes</h4>
                        <ul className="space-y-1.5">
                          {s.outcomes.map((o, oi) => (
                            <li key={oi} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Topics */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Core Topics</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {s.topics?.sections?.map((section, si) => (
                            <div key={si} className="bg-slate-50 rounded-lg p-3">
                              <p className="text-xs font-semibold text-slate-700 mb-2">{section.title}</p>
                              <ul className="space-y-1">
                                {section.items.map((item, ii) => (
                                  <li key={ii} className="text-xs text-slate-600 flex items-start gap-1.5">
                                    <span className="text-slate-400 mt-0.5">–</span>
                                    {item}
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
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">90-Minute Sample Agenda</h4>
                        <div className="space-y-1.5">
                          {s.agenda.map((a, ai) => (
                            <div key={ai} className="flex gap-3 text-sm">
                              <span className="text-slate-400 font-mono text-xs w-20 flex-shrink-0 mt-0.5">{a.time}</span>
                              <span className="text-slate-700">{a.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Homework */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                          {s.session_number === 3 ? "Follow-Through Commitments" : "Homework"}
                        </h4>
                        <ul className="space-y-1.5">
                          {s.homework.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <img src={smAdvisorsLogo} alt="SM Advisors" className="h-6 w-auto object-contain opacity-60" />
            <p className="text-xs text-slate-400 text-center">
              SM Advisors · Your Partner in AI Enablement
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;