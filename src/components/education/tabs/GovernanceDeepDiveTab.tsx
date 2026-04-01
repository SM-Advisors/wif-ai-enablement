import { Clock } from "lucide-react";

const GovernanceDeepDiveTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="flex items-center gap-2 text-accent mb-4">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">30 minutes</span>
        </div>
        
        <p className="text-lg text-foreground mb-6">
          Introduce a practical governance model grounded in ISO 42001 and tailored to real-world organizations.
        </p>
        
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>What ISO 42001 is (and is not)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Core components of an AI Management System (AIMS)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Roles, accountability, and oversight expectations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>How governance reduces risk without stalling progress</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">•</span>
            <span>Translating abstract standards into usable structure</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GovernanceDeepDiveTab;
