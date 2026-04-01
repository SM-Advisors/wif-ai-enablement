const PhaseBadge = ({ phase, weeks }: { phase: number; weeks: string }) => (
  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center shrink-0">
    <span className="text-base md:text-lg font-bold">{phase}</span>
    <span className="text-xs">{weeks}</span>
  </div>
);

const OutputBox = ({ content }: { content: string }) => (
  <div className="bg-muted rounded-lg p-3 mt-3">
    <p className="text-sm font-medium text-foreground mb-1">Outputs:</p>
    <p className="text-sm text-muted-foreground">{content}</p>
  </div>
);

const AIEnablementModal = () => {
  return (
    <div className="space-y-6 mt-4">
      {/* Phase 1 */}
      <div className="flex gap-4">
        <PhaseBadge phase={1} weeks="Wk 1-3" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Executive Ignition
          </h4>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>CEO + C-suite hands-on sessions</li>
              <li>Co-discover CEO signature workflow</li>
              <li>Define executive value hypotheses</li>
              <li>Establish baselines + KPI system</li>
              <li>Organization-wide education session (friction/chaos framing + personalized responses)</li>
            </ul>
          </div>
          <OutputBox content="90 day momentum plan, KPI definitions, CEO workflow completion, initial value measurement survey" />
        </div>
      </div>

      {/* Phase 2 */}
      <div className="flex gap-4">
        <PhaseBadge phase={2} weeks="Wk 4-6" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Early Adopters + Fast Followers
          </h4>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Identify champions within the population</li>
              <li>Guided practice sessions tied to real work</li>
              <li>Lightweight support path (office hours, "bring one task," templates)</li>
              <li>Biweekly wins call: CEO results + frontline wins + measurement update</li>
              <li>Use-case intake/triage begins</li>
            </ul>
          </div>
          <OutputBox content="Early wins with measurement, active feedback loop, use-case funnel operating, growing template library" />
        </div>
      </div>

      {/* Phase 3 */}
      <div className="flex gap-4">
        <PhaseBadge phase={3} weeks="Wk 7-12" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Scale + Package
          </h4>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Package what worked into reusable patterns</li>
              <li>Expand adoption beyond early adopters and fast followers</li>
              <li>Formalize use-case library</li>
              <li>90-day measurement readout (quant + narrative)</li>
              <li>Optional - Development of ISO 42001 governance framework</li>
            </ul>
          </div>
          <OutputBox content="Use-case library, scaling roadmap, 90-day value report, governance recommendations (optional)" />
        </div>
      </div>
    </div>
  );
};

export default AIEnablementModal;
