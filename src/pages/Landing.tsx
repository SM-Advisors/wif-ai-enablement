import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, Target, ArrowRight, Clock } from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface Milestone {
  title: string;
  date: string;
}

interface Participant {
  name: string;
  role: string;
}

interface Engagement {
  id: string;
  title: string;
  program_purpose: string;
  milestones: Milestone[];
  participants: Participant[];
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

const Landing = () => {
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch engagement
      const { data: engagementData, error: engagementError } = await supabase
        .from("engagements")
        .select("*")
        .single();

      if (engagementError) {
        console.error("Error fetching engagement:", engagementError);
      } else if (engagementData) {
        // Parse JSONB fields
        const parsed: Engagement = {
          id: engagementData.id,
          title: engagementData.title,
          program_purpose: engagementData.program_purpose || "",
          milestones: (engagementData.milestones as unknown as Milestone[]) || [],
          participants: (engagementData.participants as unknown as Participant[]) || [],
          start_date: engagementData.start_date || "",
          end_date: engagementData.end_date || "",
        };
        setEngagement(parsed);

        // Fetch sessions
        const { data: sessionsData, error: sessionsError } = await supabase
          .from("sessions")
          .select("*")
          .eq("engagement_id", engagementData.id)
          .order("session_number");

        if (sessionsError) {
          console.error("Error fetching sessions:", sessionsError);
        } else {
          setSessions(sessionsData as Session[]);
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="container max-w-4xl py-8 px-4 space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!engagement) {
    return (
      <AppShell>
        <div className="container max-w-4xl py-8 px-4 text-center">
          <p className="text-muted-foreground">No engagement data found.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container max-w-4xl py-6 md:py-8 px-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {engagement.title}
          </h1>
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(engagement.start_date)} – {formatDate(engagement.end_date)}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              4 Sessions
            </Badge>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          onClick={() => navigate("/curriculum")}
        >
          Enter Curriculum
          <ArrowRight className="h-4 w-4" />
        </Button>

        {/* Program Purpose */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Program Purpose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {engagement.program_purpose.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Milestones */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Critical Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {engagement.milestones.map((milestone, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              Primary Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {engagement.participants.map((participant, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{participant.name}</p>
                    <p className="text-sm text-muted-foreground">{participant.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Sessions Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Sessions at a Glance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
                      {session.session_number}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {formatDate(session.date)}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {session.focus}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {session.duration_minutes} min
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default Landing;
