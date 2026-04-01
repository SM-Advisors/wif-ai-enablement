import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Shield, TrendingUp, Zap, Printer } from "lucide-react";
import { usePrintToPdf } from "@/hooks/usePrintToPdf";

const HowSMAdvisorsHelpsTab = () => {
  const [isEnablementModalOpen, setIsEnablementModalOpen] = useState(false);
  const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const { printContent } = usePrintToPdf();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          How SM Advisors Helps
        </h1>
        <p className="text-muted-foreground">
          Example AI solutions tailored to your organization
        </p>
      </div>

      {/* Solution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        {/* AI Education Session - Clickable */}
        <div
          onClick={() => setIsEducationModalOpen(true)}
          className="bg-card rounded-lg p-6 shadow-sm border border-border cursor-pointer hover:border-accent hover:shadow-md group transition-all duration-200"
        >
          <BookOpen className="h-10 w-10 mb-4 text-accent group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            AI Education Session
          </h3>
          <p className="text-sm text-muted-foreground">
            2-Hour Executive Working Session
          </p>
          <p className="text-xs text-accent mt-3 font-medium">
            Click to learn more →
          </p>
        </div>

        {/* AI Governance - Clickable */}
        <div
          onClick={() => setIsGovernanceModalOpen(true)}
          className="bg-card rounded-lg p-6 shadow-sm border border-border cursor-pointer hover:border-accent hover:shadow-md group transition-all duration-200"
        >
          <Shield className="h-10 w-10 mb-4 text-accent group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            AI Governance Foundation
          </h3>
          <p className="text-sm text-muted-foreground">
            A 30–90 Day Engagement
          </p>
          <p className="text-xs text-accent mt-3 font-medium">
            Click to learn more →
          </p>
        </div>

        {/* AI Strategy & Roadmap - Clickable */}
        <div
          onClick={() => setIsStrategyModalOpen(true)}
          className="bg-card rounded-lg p-6 shadow-sm border border-border cursor-pointer hover:border-accent hover:shadow-md group transition-all duration-200"
        >
          <TrendingUp className="h-10 w-10 mb-4 text-accent group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            AI Strategy & Roadmap
          </h3>
          <p className="text-sm text-muted-foreground">
            A 60–90 Day Executive Engagement
          </p>
          <p className="text-xs text-accent mt-3 font-medium">
            Click to learn more →
          </p>
        </div>

        {/* AI Enablement - Clickable */}
        <div
          onClick={() => setIsEnablementModalOpen(true)}
          className="bg-card rounded-lg p-6 shadow-sm border border-border cursor-pointer hover:border-accent hover:shadow-md group transition-all duration-200"
        >
          <Zap className="h-10 w-10 mb-4 text-accent group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            AI Enablement
          </h3>
          <p className="text-sm text-muted-foreground">
            Accelerate hands-on AI adoption with structured enablement programs.
          </p>
          <p className="text-xs text-accent mt-3 font-medium">
            Click to learn more →
          </p>
        </div>
      </div>

      {/* AI Education Session Modal */}
      <Dialog open={isEducationModalOpen} onOpenChange={setIsEducationModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              AI Education Session
            </DialogTitle>
            <p className="text-muted-foreground">
              2-Hour Executive Working Session
            </p>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-muted-foreground mb-8">
              A focused, executive-level session designed to demystify AI, introduce practical governance structure, and equip leaders with a clear mental model for responsible AI use—without committing to a broader program.
            </p>

            {/* Section 1 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Context & Level-Set</h3>
                  <p className="text-sm text-muted-foreground">15–30 minutes</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">Objective:</span> Understand the organization's context and align the discussion to real business and risk considerations.
                </p>
                <h4 className="font-medium text-foreground text-sm mb-2">Topics:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Business model, goals, and key processes</li>
                  <li>• Current AI usage (formal and informal)</li>
                  <li>• Leadership expectations, concerns, and constraints</li>
                  <li>• Where AI opportunity intersects with governance and risk</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Getting Useful, Actionable Output from AI</h3>
                  <p className="text-sm text-muted-foreground">30 minutes</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">Objective:</span> Introduce SM Advisors' A–Z Framework for obtaining decisions and actions from AI—not just more information.
                </p>
                <h4 className="font-medium text-foreground text-sm mb-2">Topics:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• How AI interprets context, intent, and constraints</li>
                  <li>• Structuring prompts for judgment, synthesis, and recommendation</li>
                  <li>• Common failure patterns and how to avoid them</li>
                  <li>• Live examples tied to executive and risk scenarios</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Governance Deep Dive</h3>
                  <p className="text-sm text-muted-foreground">30 minutes</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">Objective:</span> Introduce a practical governance model grounded in ISO 42001 and tailored to real-world organizations.
                </p>
                <h4 className="font-medium text-foreground text-sm mb-2">Topics:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• What ISO 42001 is (and is not)</li>
                  <li>• Core components of an AI Management System (AIMS)</li>
                  <li>• Roles, accountability, and oversight expectations</li>
                  <li>• How governance reduces risk without stalling progress</li>
                  <li>• Translating abstract standards into usable structure</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                  <span className="text-lg font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Practical Patterns & Q&A</h3>
                  <p className="text-sm text-muted-foreground">30+ minutes</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">Objective:</span> Make governance usable and sustainable beyond the session.
                </p>
                <h4 className="font-medium text-foreground text-sm mb-2">Topics:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Governance and usage best practices observed across regulated environments</li>
                  <li>• Build a custom AI Agent Instruction Assistant to standardize how future agents are designed and governed</li>
                  <li>• Open Q&A focused on risk, oversight, and leadership concerns</li>
                </ul>
              </div>
            </div>

            {/* Takeaways */}
            <div className="mb-8 bg-muted rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Takeaways</h3>
              <p className="text-sm text-muted-foreground mb-2">Participants leave with:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• A customized AI Governance Handbook grounded in ISO 42001 principles</li>
                <li>• A clear mental model for responsible AI use and oversight</li>
                <li>• A reusable agent instruction assistant to support future AI development</li>
                <li>• Shared language across leadership, risk, and operations</li>
              </ul>
            </div>

            {/* Natural Next Steps */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Natural Next Steps (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-2">For organizations seeking to move beyond education:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Initial governed AI win aligned to a real business problem</li>
                <li>• Formal AI governance design and documentation</li>
                <li>• Broader workforce enablement focused on reducing friction and misuse</li>
                <li>• Ongoing monitoring and governance maturity support</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Governance Foundation Modal */}
      <Dialog open={isGovernanceModalOpen} onOpenChange={setIsGovernanceModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              AI Governance Foundation
            </DialogTitle>
            <p className="text-muted-foreground">
              A 30–90 Day Engagement
            </p>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-muted-foreground mb-8">
              A structured engagement to design and implement a lightweight, auditable AI Management & Governance System (AIMS) aligned with ISO 42001 principles and appropriate for a de novo or community bank.
            </p>

            {/* Phase 1 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">1</span>
                  <span className="text-[10px]">Weeks 1-3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Governance Scoping & Executive Alignment</h3>
                  <p className="text-sm text-muted-foreground">
                    Establish clear AI governance scope, ownership, and intent aligned to the Bank's strategy, risk appetite, and regulatory environment.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Executive and risk leadership working sessions</li>
                    <li>• Define what constitutes "AI" for the Bank (tools, assistants, vendors, embedded AI)</li>
                    <li>• Establish governance objectives and risk tolerance</li>
                    <li>• Identify applicable regulatory expectations and internal control alignment</li>
                    <li>• Define AI governance roles, oversight structure, and escalation paths</li>
                    <li>• Establish initial governance success criteria and reporting expectations</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-foreground text-sm mb-1">Outputs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Bank-specific AI scope and governance objectives</li>
                    <li>• Defined AI governance structure and ownership model</li>
                    <li>• Documented AI risk posture and tolerance statements</li>
                    <li>• Initial AI governance success criteria and reporting expectations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">2</span>
                  <span className="text-[10px]">Weeks 4-6</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Management & Control Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Design a lightweight but auditable AI Management & Governance System (AIMS) that introduces clarity, consistency, and defensibility without unnecessary burden.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Co-develop AI governance framework grounded in ISO 42001 principles</li>
                    <li>• Draft Bank-specific AI policy and supporting standards</li>
                    <li>• Define AI lifecycle controls (intake, approval, monitoring, retirement)</li>
                    <li>• Establish AI inventory and classification approach</li>
                    <li>• Define AI risk and impact assessment methodology</li>
                    <li>• Develop RACI and documentation standards for AI oversight</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-foreground text-sm mb-1">Outputs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Documented AI Management & Governance System (AIMS)</li>
                    <li>• Bank-specific AI policy and governance framework</li>
                    <li>• AI lifecycle, inventory, and control processes</li>
                    <li>• AI risk and impact assessment methodology</li>
                    <li>• Governance RACI and documentation standards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">3</span>
                  <span className="text-[10px]">Weeks 7-12</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Operationalization & Examiner Readiness</h3>
                  <p className="text-sm text-muted-foreground">
                    Operationalize the governance system and prepare the Bank to clearly explain, evidence, and defend its AI oversight to boards, auditors, and examiners.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Apply governance framework to representative AI use cases or tools</li>
                    <li>• Validate governance artifacts against real-world scenarios</li>
                    <li>• Refine documentation for clarity and auditability</li>
                    <li>• Define governance KPIs and reporting cadence</li>
                    <li>• Develop board- and examiner-facing narratives and artifacts</li>
                    <li>• Create a practical roadmap for governance maturity over time</li>
                    <li>• Optional: ISO 42001 maturity alignment and gap mapping</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-foreground text-sm mb-1">Outputs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Operationalized AI governance framework validated in practice</li>
                    <li>• AI inventory populated with governed use cases</li>
                    <li>• Governance KPIs and reporting structure</li>
                    <li>• Board- and examiner-ready AI governance materials</li>
                    <li>• AI governance maturity roadmap</li>
                    <li>• Optional ISO 42001 alignment assessment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Engagement Characteristics */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Engagement Characteristics</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Governance-first, not experimentation-first</li>
                <li>• Auditable by design, not theoretical</li>
                <li>• Right-sized for community and de novo banks</li>
                <li>• Aligned with existing risk, compliance, and oversight structures</li>
              </ul>
            </div>

            {/* Roles & Responsibilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">SM Advisors</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lead design and documentation of the AI governance system</li>
                  <li>• Facilitate governance working sessions</li>
                  <li>• Provide ISO 42001–aligned structure and practical interpretation</li>
                  <li>• Advise on examiner- and auditor-facing positioning</li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">The Bank</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Provide risk, compliance, and operational context</li>
                  <li>• Make final determinations on risk tolerance and AI usage</li>
                  <li>• Own operation, maintenance, and enforcement of the AIMS</li>
                  <li>• Present governance artifacts to internal and external stakeholders</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Strategy Modal */}
      <Dialog open={isStrategyModalOpen} onOpenChange={setIsStrategyModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              AI Strategy & Roadmap
            </DialogTitle>
            <p className="text-muted-foreground">
              A 60–90 Day Executive Engagement
            </p>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-muted-foreground mb-8">
              A structured, time-bound engagement designed to help leadership define where AI should be applied, why it matters, and how to proceed responsibly—before committing to tools, vendors, or large-scale investment.
            </p>

            {/* Phase 1 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">1</span>
                  <span className="text-[10px]">Weeks 1-3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Strategic Alignment & Readiness</h3>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">Objective:</span> Create leadership alignment on AI's role in the organization and establish strategic clarity grounded in business priorities, risk posture, and organizational readiness.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Executive and functional leader working sessions</li>
                    <li>• Clarify business objectives, constraints, and decision priorities</li>
                    <li>• Define a shared AI vision aligned with corporate strategy</li>
                    <li>• Assess organizational readiness, data maturity, and leadership capacity</li>
                    <li>• Establish success criteria and strategic decision principles</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-foreground text-sm mb-1">Outputs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clearly articulated AI vision and strategic intent</li>
                    <li>• Leadership-aligned success criteria</li>
                    <li>• Readiness and constraint assessment</li>
                    <li>• Strategic decision principles for AI initiatives</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">2</span>
                  <span className="text-[10px]">Weeks 4-6</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Opportunity Identification & Prioritization</h3>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">Objective:</span> Translate strategic intent into a focused, defensible set of AI opportunities.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Structured ideation sessions with leadership and key stakeholders</li>
                    <li>• Identify AI opportunities across efficiency, quality, risk, and growth</li>
                    <li>• Evaluate opportunities based on value, feasibility, and risk</li>
                    <li>• Identify dependencies, sequencing considerations, and constraints</li>
                    <li>• Eliminate low-value or high-risk initiatives early</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-foreground text-sm mb-1">Outputs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prioritized AI opportunity portfolio</li>
                    <li>• High-level value and feasibility assessments</li>
                    <li>• Clear rationale for included and excluded initiatives</li>
                    <li>• Initial sequencing considerations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">3</span>
                  <span className="text-[10px]">Weeks 7-12</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Roadmap & Strategic Guardrails</h3>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">Objective:</span> Convert prioritized opportunities into a practical, staged roadmap that leadership can execute with confidence.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Define near-term focus areas and longer-term horizons</li>
                    <li>• Identify governance, capability, and infrastructure prerequisites</li>
                    <li>• Establish decision checkpoints and investment gates</li>
                    <li>• Integrate risk and governance considerations into the roadmap</li>
                    <li>• Align roadmap to organizational change tolerance</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-foreground text-sm mb-1">Outputs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Phased AI strategy and execution roadmap</li>
                    <li>• Defined strategic guardrails and decision checkpoints</li>
                    <li>• Governance and capability prerequisites</li>
                    <li>• Leadership-ready strategy materials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Engagement Characteristics */}
            <div className="mb-8 bg-muted rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Engagement Characteristics</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Strategy before tools</li>
                <li>• Executive-led, not vendor-driven</li>
                <li>• Grounded in feasibility, governance, and value</li>
                <li>• Appropriate for regulated and risk-aware organizations</li>
              </ul>
            </div>

            {/* Typical Outcomes */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Typical Outcomes</h3>
              <p className="text-sm text-muted-foreground mb-2">Organizations complete this engagement with:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clarity on where AI belongs in the business</li>
                <li>• A defensible AI opportunity portfolio</li>
                <li>• A roadmap leadership can explain and stand behind</li>
                <li>• Reduced risk of misaligned or premature AI investment</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Enablement Modal */}
      <Dialog open={isEnablementModalOpen} onOpenChange={setIsEnablementModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  AI Enablement
                </DialogTitle>
                <p className="text-muted-foreground">
                  Example 90 day, customizable engagement
                </p>
              </div>
              <button
                onClick={() => printContent('education-enablement-modal-content', 'AI Enablement')}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors print:hidden"
              >
                <Printer className="h-4 w-4" />
                Print to PDF
              </button>
            </div>
          </DialogHeader>

          <div id="education-enablement-modal-content" className="mt-6">
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                    <span className="text-2xl font-bold">1</span>
                    <span className="text-xs">Weeks 1-3</span>
                  </div>
                  <div className="flex-1 bg-card rounded-lg p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Executive Ignition
                    </h3>
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Activities:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• CEO + C-suite hands-on sessions</li>
                        <li>• Co-discover CEO signature workflow</li>
                        <li>• Define executive value hypotheses</li>
                        <li>• Establish baselines + KPI system</li>
                        <li>
                          • Organization-wide education session (friction/chaos framing +
                          personalized responses)
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        Outputs:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        90 day momentum plan, KPI definitions, CEO workflow completion,
                        initial value measurement survey
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                    <span className="text-2xl font-bold">2</span>
                    <span className="text-xs">Weeks 4-6</span>
                  </div>
                  <div className="flex-1 bg-card rounded-lg p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Early Adopters + Fast Followers
                    </h3>
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Activities:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Identify champions within the population</li>
                        <li>• Guided practice sessions tied to real work</li>
                        <li>
                          • Lightweight support path (office hours, "bring one task,"
                          templates)
                        </li>
                        <li>
                          • Biweekly wins call: CEO results + frontline wins + measurement
                          update
                        </li>
                        <li>• Use-case intake/triage begins</li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        Outputs:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Early wins with measurement, active feedback loop, use-case funnel
                        operating, growing template library
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                    <span className="text-2xl font-bold">3</span>
                    <span className="text-xs">Weeks 7-12</span>
                  </div>
                  <div className="flex-1 bg-card rounded-lg p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Scale + Package
                    </h3>
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Activities:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Package what worked into reusable patterns</li>
                        <li>• Expand adoption beyond early adopters and fast followers</li>
                        <li>• Formalize use-case library</li>
                        <li>• 90-day measurement readout (quant + narrative)</li>
                        <li>• Optional - Development of ISO 42001 governance framework</li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        Outputs:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Use-case library, scaling roadmap, 90-day value report, governance
                        recommendations (optional)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HowSMAdvisorsHelpsTab;
