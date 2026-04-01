import { CheckCircle } from "lucide-react";

const PhaseBadge = ({ phase, weeks }: { phase: number; weeks: string }) => (
  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center shrink-0">
    <span className="text-sm md:text-base font-bold">{phase}</span>
    <span className="text-[10px] md:text-xs">{weeks}</span>
  </div>
);

const OutputBox = ({ items }: { items: string[] }) => (
  <div className="bg-muted rounded-lg p-3 mt-3">
    <p className="text-sm font-medium text-foreground mb-2">Outputs:</p>
    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const AIStrategyModal = () => {
  return (
    <div className="space-y-6 mt-4">
      {/* Intro */}
      <p className="text-muted-foreground">
        A structured, time-bound engagement designed to help leadership define where AI should be applied, why it matters, and how to proceed responsibly—before committing to tools, vendors, or large-scale investment.
      </p>

      {/* Phase 1 */}
      <div className="flex gap-4">
        <PhaseBadge phase={1} weeks="Wk 1-3" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Strategic Alignment & Readiness
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Create leadership alignment on AI's role in the organization and establish strategic clarity grounded in business priorities, risk posture, and organizational readiness.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Executive and functional leader working sessions</li>
              <li>Clarify business objectives, constraints, and decision priorities</li>
              <li>Define a shared AI vision aligned with corporate strategy</li>
              <li>Assess organizational readiness, data maturity, and leadership capacity</li>
              <li>Establish success criteria and strategic decision principles</li>
            </ul>
          </div>
          <OutputBox
            items={[
              "Clearly articulated AI vision and strategic intent",
              "Leadership-aligned success criteria",
              "Readiness and constraint assessment",
              "Strategic decision principles for AI initiatives",
            ]}
          />
        </div>
      </div>

      {/* Phase 2 */}
      <div className="flex gap-4">
        <PhaseBadge phase={2} weeks="Wk 4-6" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Opportunity Identification & Prioritization
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Translate strategic intent into a focused, defensible set of AI opportunities.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Structured ideation sessions with leadership and key stakeholders</li>
              <li>Identify AI opportunities across efficiency, quality, risk, and growth</li>
              <li>Evaluate opportunities based on value, feasibility, and risk</li>
              <li>Identify dependencies, sequencing considerations, and constraints</li>
              <li>Eliminate low-value or high-risk initiatives early</li>
            </ul>
          </div>
          <OutputBox
            items={[
              "Prioritized AI opportunity portfolio",
              "High-level value and feasibility assessments",
              "Clear rationale for included and excluded initiatives",
              "Initial sequencing considerations",
            ]}
          />
        </div>
      </div>

      {/* Phase 3 */}
      <div className="flex gap-4">
        <PhaseBadge phase={3} weeks="Wk 7-12" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Roadmap & Strategic Guardrails
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Objective:</span> Convert prioritized opportunities into a practical, staged roadmap that leadership can execute with confidence.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Define near-term focus areas and longer-term horizons</li>
              <li>Identify governance, capability, and infrastructure prerequisites</li>
              <li>Establish decision checkpoints and investment gates</li>
              <li>Integrate risk and governance considerations into the roadmap</li>
              <li>Align roadmap to organizational change tolerance</li>
            </ul>
          </div>
          <OutputBox
            items={[
              "Phased AI strategy and execution roadmap",
              "Defined strategic guardrails and decision checkpoints",
              "Governance and capability prerequisites",
              "Leadership-ready strategy materials",
            ]}
          />
        </div>
      </div>

      {/* Engagement Characteristics */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-2">Engagement Characteristics</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Strategy before tools</li>
          <li>Executive-led, not vendor-driven</li>
          <li>Grounded in feasibility, governance, and value</li>
          <li>Appropriate for regulated and risk-aware organizations</li>
        </ul>
      </div>

      {/* Typical Outcomes */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">Typical Outcomes</h4>
        <ul className="space-y-2">
          {[
            "Clarity on where AI belongs in the business",
            "A defensible AI opportunity portfolio",
            "A roadmap leadership can explain and stand behind",
            "Reduced risk of misaligned or premature AI investment",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIStrategyModal;
