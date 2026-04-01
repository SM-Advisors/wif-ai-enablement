import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PROGRAM, SESSION_CONTENT } from "@/data/curriculumContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Sparkles, Target, Users } from "lucide-react";
import smAdvisorsLogo from "@/assets/sm-advisors-logo-new.webp";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <img src={smAdvisorsLogo} alt="SM Advisors" className="h-7 w-auto object-contain" />
          <Link to={user ? "/program" : "/login"}>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
              {user ? (
                <>
                  <BookOpen className="h-4 w-4" />
                  Enter Program
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-6">
            AI Enablement Program
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
            {PROGRAM.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
            {PROGRAM.shortSummary}
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="text-sm">3 Sessions · 90 min each</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Target className="h-4 w-4 text-orange-400" />
              <span className="text-sm">Hands-on workshops</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-sm">Personalized AI systems</span>
            </div>
          </div>
          <Link to={user ? "/program" : "/login"}>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-base px-8">
              {user ? "Go to Program" : "Sign Up Now"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Narrative Arc */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">The Journey</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {PROGRAM.narrativeArc}
          </p>
        </div>
      </section>

      {/* Session Cards */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SESSION_CONTENT.map((s, i) => {
              const colors = [
                "border-t-orange-500",
                "border-t-slate-700",
                "border-t-orange-400",
              ];
              const accents = ["text-orange-500", "text-slate-700", "text-orange-400"];
              return (
                <div
                  key={s.sessionNumber}
                  className={`bg-white rounded-xl border border-slate-200 border-t-4 ${colors[i]} p-6 flex flex-col`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-3xl font-bold ${accents[i]}`}>{s.sessionNumber}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 leading-tight">{s.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{s.durationMinutes} minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 flex-1">{s.themeDescription}</p>
                  <div className="space-y-1.5">
                    {s.outcomes.slice(0, 3).map((o, oi) => (
                      <div key={oi} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1 h-1 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                        {o}
                      </div>
                    ))}
                    {s.outcomes.length > 3 && (
                      <p className="text-xs text-slate-400 pl-3">+{s.outcomes.length - 3} more outcomes</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
        <p className="text-slate-600 mb-8 max-w-lg mx-auto">
          Join the program and start building practical AI skills you can apply immediately.
        </p>
        <Link to={user ? "/program" : "/login"}>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-base px-8">
            {user ? "Enter Program" : "Sign Up"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={smAdvisorsLogo} alt="SM Advisors" className="h-5 w-auto object-contain opacity-50" />
          <p className="text-xs text-slate-400">SM Advisors · Your Partner in AI Enablement</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
