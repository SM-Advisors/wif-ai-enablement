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

const AIGovernanceModal = () => {
  return (
    <div className="space-y-6 mt-4">
      {/* Intro */}
      <p className="text-muted-foreground">
        A structured engagement to design and implement a lightweight, auditable AI Management & Governance System (AIMS) aligned with ISO 42001 principles and appropriate for a de novo or community bank.
      </p>

      {/* Phase 1 */}
      <div className="flex gap-4">
        <PhaseBadge phase={1} weeks="Wk 1-3" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Governance Scoping & Executive Alignment
          </h4>
          <p className="text-sm text-muted-foreground">
            Establish clear AI governance scope, ownership, and intent aligned to the Bank's strategy, risk appetite, and regulatory environment.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Executive and risk leadership working sessions</li>
              <li>Define what constitutes "AI" for the Bank (tools, assistants, vendors, embedded AI)</li>
              <li>Establish governance objectives and risk tolerance</li>
              <li>Identify applicable regulatory expectations and internal control alignment</li>
              <li>Define AI governance roles, oversight structure, and escalation paths</li>
              <li>Establish initial governance success criteria and reporting expectations</li>
            </ul>
          </div>
          <OutputBox
            items={[
              "Bank-specific AI scope and governance objectives",
              "Defined AI governance structure and ownership model",
              "Documented AI risk posture and tolerance statements",
              "Initial AI governance success criteria and reporting expectations",
            ]}
          />
        </div>
      </div>

      {/* Phase 2 */}
      <div className="flex gap-4">
        <PhaseBadge phase={2} weeks="Wk 4-6" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            AI Management & Control Design
          </h4>
          <p className="text-sm text-muted-foreground">
            Design a lightweight but auditable AI Management & Governance System (AIMS) that introduces clarity, consistency, and defensibility without unnecessary burden.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Co-develop AI governance framework grounded in ISO 42001 principles</li>
              <li>Draft Bank-specific AI policy and supporting standards</li>
              <li>Define AI lifecycle controls (intake, approval, monitoring, retirement)</li>
              <li>Establish AI inventory and classification approach</li>
              <li>Define AI risk and impact assessment methodology</li>
              <li>Develop RACI and documentation standards for AI oversight</li>
            </ul>
          </div>
          <OutputBox
            items={[
              "Documented AI Management & Governance System (AIMS)",
              "Bank-specific AI policy and governance framework",
              "AI lifecycle, inventory, and control processes",
              "AI risk and impact assessment methodology",
              "Governance RACI and documentation standards",
            ]}
          />
        </div>
      </div>

      {/* Phase 3 */}
      <div className="flex gap-4">
        <PhaseBadge phase={3} weeks="Wk 7-12" />
        <div className="space-y-3 flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            Operationalization & Examiner Readiness
          </h4>
          <p className="text-sm text-muted-foreground">
            Operationalize the governance system and prepare the Bank to clearly explain, evidence, and defend its AI oversight to boards, auditors, and examiners.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Apply governance framework to representative AI use cases or tools</li>
              <li>Validate governance artifacts against real-world scenarios</li>
              <li>Refine documentation for clarity and auditability</li>
              <li>Define governance KPIs and reporting cadence</li>
              <li>Develop board- and examiner-facing narratives and artifacts</li>
              <li>Create a practical roadmap for governance maturity over time</li>
              <li>Optional: ISO 42001 maturity alignment and gap mapping</li>
            </ul>
          </div>
          <OutputBox
            items={[
              "Operationalized AI governance framework validated in practice",
              "AI inventory populated with governed use cases",
              "Governance KPIs and reporting structure",
              "Board- and examiner-ready AI governance materials",
              "AI governance maturity roadmap",
              "Optional ISO 42001 alignment assessment",
            ]}
          />
        </div>
      </div>

      {/* Engagement Characteristics */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-2">Engagement Characteristics</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Governance-first, not experimentation-first</li>
          <li>Auditable by design, not theoretical</li>
          <li>Right-sized for community and de novo banks</li>
          <li>Aligned with existing risk, compliance, and oversight structures</li>
        </ul>
      </div>

      {/* Roles & Responsibilities */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Roles & Responsibilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="font-medium text-foreground mb-2">SM Advisors</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Lead design and documentation of the AI governance system</li>
              <li>Facilitate governance working sessions</li>
              <li>Provide ISO 42001–aligned structure and practical interpretation</li>
              <li>Advise on examiner- and auditor-facing positioning</li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="font-medium text-foreground mb-2">The Bank</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Provide risk, compliance, and operational context</li>
              <li>Make final determinations on risk tolerance and AI usage</li>
              <li>Own operation, maintenance, and enforcement of the AIMS</li>
              <li>Present governance artifacts to internal and external stakeholders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGovernanceModal;
