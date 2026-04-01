import { CheckCircle } from "lucide-react";

const PhaseBadge = ({ phase, weeks }: { phase: number; weeks: string }) => (
  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center shrink-0">
    <span className="text-sm md:text-base font-bold">{phase}</span>
    <span className="text-[10px] md:text-xs">{weeks}</span>
  </div>
);

const AIEducationModal = () => {
  return (
    <div className="space-y-6 mt-4">
      {/* Intro */}
      <p className="text-muted-foreground">
        A focused, executive-level session designed to demystify AI, introduce practical governance structure, and equip leaders with a clear mental model for responsible AI use—without committing to a broader program.
      </p>

      {/* Section 1 */}
      <div className="flex gap-4">
        <PhaseBadge phase={1} weeks="15-30m" />
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">
            Context & Level-Set
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Understand the organization's context and align the discussion to real business and risk considerations.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Topics:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Business model, goals, and key processes</li>
              <li>Current AI usage (formal and informal)</li>
              <li>Leadership expectations, concerns, and constraints</li>
              <li>Where AI opportunity intersects with governance and risk</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex gap-4">
        <PhaseBadge phase={2} weeks="30m" />
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">
            Getting Useful, Actionable Output from AI
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Introduce SM Advisors' A–Z Framework for obtaining decisions and actions from AI—not just more information.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Topics:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>How AI interprets context, intent, and constraints</li>
              <li>Structuring prompts for judgment, synthesis, and recommendation</li>
              <li>Common failure patterns and how to avoid them</li>
              <li>Live examples tied to executive and risk scenarios</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex gap-4">
        <PhaseBadge phase={3} weeks="30m" />
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">
            AI Governance Deep Dive
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Introduce a practical governance model grounded in ISO 42001 and tailored to real-world organizations.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Topics:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>What ISO 42001 is (and is not)</li>
              <li>Core components of an AI Management System (AIMS)</li>
              <li>Roles, accountability, and oversight expectations</li>
              <li>How governance reduces risk without stalling progress</li>
              <li>Translating abstract standards into usable structure</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex gap-4">
        <PhaseBadge phase={4} weeks="30m+" />
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">
            Practical Patterns & Q&A
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Make governance usable and sustainable beyond the session.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Topics:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Governance and usage best practices observed across regulated environments</li>
              <li>Build a custom AI Agent Instruction Assistant to standardize how future agents are designed and governed</li>
              <li>Open Q&A focused on risk, oversight, and leadership concerns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Takeaways */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-foreground">Takeaways</h4>
        <ul className="space-y-2">
          {[
            "A customized AI Governance Handbook grounded in ISO 42001 principles",
            "A clear mental model for responsible AI use and oversight",
            "A reusable agent instruction assistant to support future AI development",
            "Shared language across leadership, risk, and operations",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">Natural Next Steps (Optional)</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Initial governed AI win aligned to a real business problem</li>
          <li>Formal AI governance design and documentation</li>
          <li>Broader workforce enablement focused on reducing friction and misuse</li>
          <li>Ongoing monitoring and governance maturity support</li>
        </ul>
      </div>
    </div>
  );
};

export default AIEducationModal;
