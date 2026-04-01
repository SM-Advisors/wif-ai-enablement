import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  PlayCircle,
  Package,
  ClipboardList,
  Briefcase,
  CheckCircle2,
  Clock,
  AlertCircle,
  Lock,
} from "lucide-react";
import InstructorNotes from "./InstructorNotes";

type SessionStatus = "not_started" | "in_progress" | "complete" | "locked";

interface SessionContent {
  title: string;
  focus: string;
  purpose: string;
  howSessionIsRun: string[];
  deliverables: string[];
  homeworkBank?: string[];
  prepSM?: string[];
  closeOut?: string;
}

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

interface Session {
  id: string;
  session_number: number;
  date: string;
  duration_minutes: number;
  focus: string;
}

interface SessionTabProps {
  session: Session;
  content: SessionContent;
  note: SessionNote | undefined;
}

const statusConfig = {
  not_started: { label: "Not Started", icon: Clock, color: "bg-muted text-muted-foreground" },
  in_progress: { label: "In Progress", icon: AlertCircle, color: "bg-blue-100 text-blue-700" },
  complete: { label: "Complete", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  locked: { label: "Locked", icon: Lock, color: "bg-amber-100 text-amber-700" },
};

const SessionTab = ({
  session,
  content,
  note,
}: SessionTabProps) => {
  const currentStatus = note?.status || "not_started";
  const StatusIcon = statusConfig[currentStatus].icon;

  return (
    <div className="space-y-6 pb-8">
      {/* Session Header with Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {content.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{content.focus}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`gap-1 ${statusConfig[currentStatus].color}`}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig[currentStatus].label}
          </Badge>
          {note?.completed_at && currentStatus === "complete" && (
            <span className="text-xs text-muted-foreground">
              {new Date(note.completed_at).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Jump-to Navigation for Mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
        {["Purpose", "How Run", "Deliverables", "Notes"].map((section) => (
          <a
            key={section}
            href={`#${section.toLowerCase().replace(" ", "-")}`}
            className="px-3 py-1 text-xs font-medium bg-muted rounded-full whitespace-nowrap hover:bg-muted/80"
          >
            {section}
          </a>
        ))}
      </div>

      {/* Curriculum Content - Read Only */}
      <div className="space-y-4">
        {/* Purpose */}
        <Card id="purpose">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-secondary" />
              Purpose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{content.purpose}</p>
          </CardContent>
        </Card>

        {/* How the Session Is Run */}
        <Card id="how-run">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-secondary" />
              How the Session Is Run
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.howSessionIsRun.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span className="whitespace-pre-line">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Deliverables / Artifacts */}
        <Card id="deliverables">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-secondary" />
              Deliverables / Artifacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Homework (Bank) - if exists */}
        {content.homeworkBank && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-secondary" />
                Homework (Bank)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {content.homeworkBank.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Prep (SM) - if exists */}
        {content.prepSM && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-secondary" />
                Prep (SM Advisors)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {content.prepSM.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Close-Out - Session 4 only */}
        {content.closeOut && (
          <Card className="border-secondary/50 bg-secondary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Close-Out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {content.closeOut}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Personal Notes Capture - Per User */}
      <InstructorNotes sessionId={session.id} />
    </div>
  );
};

export default SessionTab;
