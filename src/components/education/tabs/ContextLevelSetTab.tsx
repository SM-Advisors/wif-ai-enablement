import { Clock } from "lucide-react";

const ContextLevelSetTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="flex items-center gap-2 text-accent mb-4">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">15–30 minutes</span>
        </div>
        
        <p className="text-lg text-foreground mb-6">
          Understand the organization's context and align the discussion to real business and risk considerations.
        </p>
        
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Business model, goals, and key processes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Current AI usage (formal and informal)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Leadership expectations, concerns, and constraints</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Where AI opportunity intersects with governance and risk</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContextLevelSetTab;
