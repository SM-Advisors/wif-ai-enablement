import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, BookOpen, Shield, TrendingUp, Printer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePrintToPdf } from "@/hooks/usePrintToPdf";

const IntroductionTab = () => {
  const navigate = useNavigate();
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const { printContent } = usePrintToPdf();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Welcome to AI Enablement and AIMS</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A hands-on session designed to help BankMiami's board understand AI opportunities and oversight responsibilities
        </p>
      </div>

      {/* About SM Advisors */}
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4">About SM Advisors</h3>
        <p className="text-muted-foreground mb-4">
          SM Advisors helps community banks navigate AI adoption with practical strategies grounded in regulatory awareness and risk management. We focus on enabling real productivity gains while maintaining the governance and oversight that banking requires.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Cory Kronheim</strong> leads SM Advisors' AI practice, bringing hands-on experience implementing AI solutions in regulated financial environments.
        </p>
      </div>

      {/* SM Advisors Services Section */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3 text-center">
          SM Advisors Services
        </h3>
        
        {/* Service tiles - 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => navigate("/ai-enablement")}
            className="bg-card rounded-lg p-3 text-left shadow-sm border border-border hover:border-accent hover:shadow-md transition-all duration-200 group"
          >
            <Zap className="h-6 w-6 text-accent mb-2 stroke-[1.5] group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-foreground mb-0.5">
              AI Enablement
            </h4>
            <p className="text-xs text-muted-foreground mb-1">
              Hands-on AI adoption programs
            </p>
            <span className="text-accent text-xs font-medium">
              Learn more →
            </span>
          </button>

          <button
            onClick={() => setIsEducationModalOpen(true)}
            className="bg-card rounded-lg p-3 text-left shadow-sm border border-border hover:border-accent hover:shadow-md transition-all duration-200 group"
          >
            <BookOpen className="h-6 w-6 text-accent mb-2 stroke-[1.5] group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-foreground mb-0.5">
              AI Education
            </h4>
            <p className="text-xs text-muted-foreground mb-1">
              2-Hour Executive Session
            </p>
            <span className="text-accent text-xs font-medium">
              Learn more →
            </span>
          </button>

          <button
            onClick={() => setIsGovernanceModalOpen(true)}
            className="bg-card rounded-lg p-3 text-left shadow-sm border border-border hover:border-accent hover:shadow-md transition-all duration-200 group"
          >
            <Shield className="h-6 w-6 text-accent mb-2 stroke-[1.5] group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-foreground mb-0.5">
              AI Governance
            </h4>
            <p className="text-xs text-muted-foreground mb-1">
              30–60 Day Engagement
            </p>
            <span className="text-accent text-xs font-medium">
              Learn more →
            </span>
          </button>

          <button
            onClick={() => setIsStrategyModalOpen(true)}
            className="bg-card rounded-lg p-3 text-left shadow-sm border border-border hover:border-accent hover:shadow-md transition-all duration-200 group"
          >
            <TrendingUp className="h-6 w-6 text-accent mb-2 stroke-[1.5] group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-foreground mb-0.5">
              AI Strategy
            </h4>
            <p className="text-xs text-muted-foreground mb-1">
              60–90 Day Engagement
            </p>
            <span className="text-accent text-xs font-medium">
              Learn more →
            </span>
          </button>
        </div>
      </div>

      {/* AI Education Session Modal */}
      <Dialog open={isEducationModalOpen} onOpenChange={setIsEducationModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  AI Education Session
                </DialogTitle>
                <p className="text-muted-foreground">
                  2-Hour Executive Working Session
                </p>
              </div>
              <button
                onClick={() => printContent('education-modal-content-intro', 'AI Education Session')}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors print:hidden"
              >
                <Printer className="h-4 w-4" />
                Print to PDF
              </button>
            </div>
          </DialogHeader>

          <div id="education-modal-content-intro" className="mt-6">
            <p className="text-muted-foreground mb-8">
              A focused, executive-level session designed to demystify AI, introduce practical governance structure, and equip leaders with a clear mental model for responsible AI use—without committing to a broader program.
            </p>

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
                  <li>• Leave you with a personalized, comprehensive AI governance handbook</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                  <span className="text-lg font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Practical Patterns & Q&A</h3>
                  <p className="text-sm text-muted-foreground">30 minutes</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">Objective:</span> Make governance usable and sustainable beyond the session.
                </p>
                <h4 className="font-medium text-foreground text-sm mb-2">Topics:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Governance and usage best practices observed across regulated environments</li>
                  <li>• Open Q&A focused on risk, oversight, and leadership concerns</li>
                </ul>
              </div>
            </div>

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
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  AI Governance Foundation
                </DialogTitle>
                <p className="text-muted-foreground">
                  A 30–60 Day Engagement
                </p>
              </div>
              <button
                onClick={() => printContent('governance-modal-content-intro', 'AI Governance Foundation')}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors print:hidden"
              >
                <Printer className="h-4 w-4" />
                Print to PDF
              </button>
            </div>
          </DialogHeader>

          <div id="governance-modal-content-intro" className="mt-6">
            <p className="text-muted-foreground mb-8">
              A structured engagement to design and implement a lightweight, auditable AI Management & Governance System (AIMS) aligned with ISO 42001 principles and appropriate for a de novo or community bank.
            </p>

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
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Deliverables:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Governance Charter (scope, ownership, guiding principles)</li>
                    <li>• Executive-approved AI Definition and Classification Framework</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">2</span>
                  <span className="text-[10px]">Weeks 3-5</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AIMS Design & Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Design a practical, right-sized AI Management System (AIMS) covering lifecycle governance, risk controls, and accountability.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Map governance processes across AI lifecycle (intake, risk assessment, approval, monitoring, retirement)</li>
                    <li>• Draft core policies, procedures, and control documentation</li>
                    <li>• Align roles, responsibilities, and escalation paths</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Deliverables:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Use Policy</li>
                    <li>• AI Risk Assessment Framework (intake form, risk tiering, approval workflow)</li>
                    <li>• AI Inventory Template</li>
                    <li>• Roles & Responsibilities Matrix (RACI)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">3</span>
                  <span className="text-[10px]">Weeks 5-8</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Implementation & Enablement</h3>
                  <p className="text-sm text-muted-foreground">
                    Operationalize governance, validate through a pilot use case, and enable sustainable internal ownership.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pilot governance process with 1–2 real AI use cases</li>
                    <li>• Train governance owners and stakeholders</li>
                    <li>• Refine documentation based on pilot learnings</li>
                    <li>• Prepare for audit, board, and regulatory readiness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Deliverables:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Completed AI Risk Assessments for pilot use cases</li>
                    <li>• Training materials and governance playbook</li>
                    <li>• Board-ready governance summary</li>
                    <li>• Ongoing monitoring and review cadence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Strategy & Roadmap Modal */}
      <Dialog open={isStrategyModalOpen} onOpenChange={setIsStrategyModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  AI Strategy & Roadmap
                </DialogTitle>
                <p className="text-muted-foreground">
                  A 60–90 Day Executive Engagement
                </p>
              </div>
              <button
                onClick={() => printContent('strategy-modal-content-intro', 'AI Strategy & Roadmap')}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors print:hidden"
              >
                <Printer className="h-4 w-4" />
                Print to PDF
              </button>
            </div>
          </DialogHeader>

          <div id="strategy-modal-content-intro" className="mt-6">
            <p className="text-muted-foreground mb-8">
              A comprehensive engagement to define, prioritize, and plan AI initiatives aligned with your bank's strategic objectives, risk appetite, and operational capacity.
            </p>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">1</span>
                  <span className="text-[10px]">Weeks 1-3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Discovery & Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand current state, strategic priorities, and AI readiness across the organization.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Executive interviews and stakeholder discovery</li>
                    <li>• Current state technology and data assessment</li>
                    <li>• AI opportunity identification across business lines</li>
                    <li>• Risk and regulatory landscape review</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Deliverables:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Readiness Assessment Report</li>
                    <li>• Opportunity Inventory with initial prioritization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">2</span>
                  <span className="text-[10px]">Weeks 4-8</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Strategy Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Define AI vision, prioritize initiatives, and design the implementation roadmap.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI vision and principles workshop</li>
                    <li>• Use case prioritization and business case development</li>
                    <li>• Technology and vendor evaluation</li>
                    <li>• Organizational and governance model design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Deliverables:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Strategy Document</li>
                    <li>• Prioritized Use Case Portfolio</li>
                    <li>• Technology Architecture Recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground">
                  <span className="text-xl font-bold">3</span>
                  <span className="text-[10px]">Weeks 9-12</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Roadmap & Execution Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Build detailed implementation plan with milestones, resources, and success metrics.
                  </p>
                </div>
              </div>
              
              <div className="ml-20 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Activities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Detailed roadmap development (12-24 month view)</li>
                    <li>• Resource and budget planning</li>
                    <li>• Success metrics and KPI definition</li>
                    <li>• Executive presentation and board briefing preparation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Deliverables:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Implementation Roadmap</li>
                    <li>• Investment and Resource Plan</li>
                    <li>• Board-Ready Executive Summary</li>
                    <li>• Quick Win Implementation Guide</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntroductionTab;