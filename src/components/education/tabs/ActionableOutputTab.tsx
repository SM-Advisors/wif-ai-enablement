import { Clock } from "lucide-react";

const ActionableOutputTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="flex items-center gap-2 text-accent mb-4">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">30 minutes</span>
        </div>
        
        <p className="text-lg text-foreground mb-6">
          Introduce SM Advisors' A–Z Framework for obtaining decisions and actions from AI—not just more information.
        </p>
        
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>How AI interprets context, intent, and constraints</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Structuring prompts for judgment, synthesis, and recommendation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Common failure patterns and how to avoid them</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Live examples tied to executive and risk scenarios</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionableOutputTab;
