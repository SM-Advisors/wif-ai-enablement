import { Clock } from "lucide-react";

const PracticalPatternsTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="flex items-center gap-2 text-accent mb-4">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">30+ minutes</span>
        </div>
        
        <p className="text-lg text-foreground mb-6">
          Make governance usable and sustainable beyond the session.
        </p>
        
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Governance and usage best practices observed across regulated environments</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Build a custom AI Agent Instruction Assistant to standardize how future agents are designed and governed</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Open Q&A focused on risk, oversight, and leadership concerns</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PracticalPatternsTab;
