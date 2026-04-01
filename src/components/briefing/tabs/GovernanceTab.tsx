import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GovernanceTab = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          AI Governance Framework
        </h1>
        <p className="text-muted-foreground">Aligned to ISO/IEC 42001</p>
        <p className="text-sm text-muted-foreground mt-2">
          SM Advisors is a certified ISO 42001 Lead Implementer of AI Management Systems
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Introduction Accordions */}
        <Accordion type="multiple" className="space-y-3 mb-8">
          <AccordionItem value="what-is" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">What is ISO/IEC 42001?</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              ISO/IEC 42001 is the international standard for establishing an AI Management System (AIMS) 
              that governs how AI is designed, used, and overseen across its lifecycle. It enables 
              organizations to scale AI responsibly—balancing innovation with risk, accountability, 
              and regulatory readiness.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="why-matters" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Why ISO/IEC 42001 Matters to Leadership</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  AI governance owned at the management level—not buried in IT.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              ISO/IEC 42001 provides a management-owned governance structure for AI. It clarifies 
              decision rights, risk ownership, accountability, and assurance—similar to what ISO 27001 
              did for cybersecurity, but purpose-built for AI enablement.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Clause-by-Clause Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            ISO/IEC 42001 — Clause-by-Clause Governance View
          </h2>
        </div>

        <Accordion type="multiple" className="space-y-3">
          <AccordionItem value="clause-4" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 4 — Context of the Organization</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Defines where AI fits in the business.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Establishes the organizational context for AI, including AI use cases, stakeholders, 
              external obligations, and the defined scope of AI governance across the enterprise.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clause-5" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 5 — Leadership</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Sets the tone at the top.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Requires executive ownership of AI governance, a formal AI policy, and clearly assigned 
              roles, responsibilities, and authorities for AI oversight.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clause-6" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 6 — Planning</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Turns intent into controlled action.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Introduces AI risk assessment, AI system impact assessment, defined AI objectives, 
              and risk-based planning to ensure AI is deployed deliberately and responsibly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clause-7" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 7 — Support</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Enables AI responsibly at scale.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Covers the resources, skills, awareness, communication, and documentation needed to 
              operate and govern AI systems effectively.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clause-8" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 8 — Operation</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Governs how AI is built and used.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Applies controls across the AI lifecycle, including development, deployment, monitoring, 
              change management, and third-party or supplier AI use.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clause-9" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 9 — Performance Evaluation</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Provides executive assurance.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Requires monitoring, internal audits, and management review to assess AI performance, 
              compliance, and governance effectiveness.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clause-10" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Clause 10 — Improvement</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Ensures governance evolves with AI.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              Drives continual improvement through corrective actions, lessons learned, and 
              increasing governance maturity over time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default GovernanceTab;
