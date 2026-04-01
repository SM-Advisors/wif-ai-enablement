import { useState } from "react";
import { Gauge, Wind, ChevronDown } from "lucide-react";
import PromptStepper from "../PromptStepper";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  causes: string[];
  looksLike: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

const CollapsibleCard = ({
  icon,
  title,
  description,
  causes,
  looksLike,
  isExpanded,
  onToggle,
}: CollapsibleCardProps) => {
  return (
    <div
      onClick={onToggle}
      className="bg-primary text-primary-foreground rounded-lg p-6 cursor-pointer transition-all duration-200 hover:brightness-110"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </div>
      <p className="text-primary-foreground/90">{description}</p>

      {/* Expandable content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm uppercase tracking-wide text-primary-foreground/70">
              What it causes:
            </h4>
            <ul className="space-y-1 text-sm text-primary-foreground/90">
              {causes.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-sm uppercase tracking-wide text-primary-foreground/70">
              What it looks like:
            </h4>
            <ul className="space-y-1 text-sm text-primary-foreground/90">
              {looksLike.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {!isExpanded && (
        <p className="text-xs text-primary-foreground/60 mt-3">Click to learn more</p>
      )}
    </div>
  );
};

const FrictionChaosTab = () => {
  const [expandedCard, setExpandedCard] = useState<"friction" | "chaos" | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">Friction & Chaos</h1>
        <p className="text-muted-foreground">
          Two forces limit AI value creation. Understanding both is the first step.
        </p>
      </div>

      {/* Two Tiles */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <CollapsibleCard
          icon={<Gauge className="h-8 w-8" />}
          title="Friction"
          description="The inability to reliably get from prompt to useful outcome"
          causes={["Frustration", "Narrower use", "Lower return rate"]}
          looksLike={[
            "Drafts that need heavy editing",
            "Uncertainty about accuracy",
            "Unclear how to use safely",
          ]}
          isExpanded={expandedCard === "friction"}
          onToggle={() => setExpandedCard(expandedCard === "friction" ? null : "friction")}
        />

        <CollapsibleCard
          icon={<Wind className="h-8 w-8" />}
          title="Chaos"
          description="Overwhelm from speed, noise, and ambiguity"
          causes={["Intimidation", "Avoidance", '"I can\'t keep up"']}
          looksLike={[
            "Tool sprawl",
            "Rumor-driven narratives",
            "Inconsistent practices",
            "Uncertainty about what's allowed",
          ]}
          isExpanded={expandedCard === "chaos"}
          onToggle={() => setExpandedCard(expandedCard === "chaos" ? null : "chaos")}
        />
      </div>

      {/* Prompt Evolution Stepper */}
      <div className="max-w-2xl mx-auto">
        <PromptStepper />
      </div>
    </div>
  );
};

export default FrictionChaosTab;