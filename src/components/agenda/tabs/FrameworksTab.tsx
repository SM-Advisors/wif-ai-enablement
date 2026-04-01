import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import aimsDashboard from "@/assets/aims-dashboard.png";

const FrameworksTab = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Frameworks for Success
        </h1>
        <p className="text-muted-foreground">
          A practical structure for safely introducing AI into your bank
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
        {/* Left Column - 8 Phase Framework */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              8-Phase AI Enablement Framework
            </h2>
            <p className="text-sm text-muted-foreground">SM Advisors</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="space-y-4">
              {[
                { phase: "0", title: "Organizational Readiness Assessment", color: "bg-[#1a3a4a]" },
                { phase: "1", title: "Strategic Alignment & Leadership Enablement", color: "bg-[#e85a3c]" },
                { phase: "2", title: "Strategic Opportunity Identification & Prioritization", color: "bg-[#3a9a8c]" },
                { phase: "3", title: "Risk Governance & Mitigation", color: "bg-[#6b7280]" },
                { phase: "4", title: "Feasibility Analysis & Technical Enablement", color: "bg-[#3a9a8c]" },
                { phase: "5", title: "Implementation & Ethical Scaling", color: "bg-[#e85a3c]" },
                { phase: "6", title: "Talent & Cultural Transformation", color: "bg-[#e85a3c]" },
                { phase: "7", title: "Continuous Improvement & Value Measurement", color: "bg-[#6b7280]" },
              ].map((item) => (
                <div key={item.phase} className="flex items-center gap-4">
                  <div className={`${item.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0`}>
                    {item.phase}
                  </div>
                  <span className="text-foreground font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - ISO 42001 Content */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              AI Governance Framework
            </h2>
            <p className="text-sm text-muted-foreground">Aligned to ISO/IEC 42001</p>
          </div>

          {/* Introduction Accordions */}
          <Accordion type="multiple" className="space-y-3 mb-6">
            <AccordionItem value="what-is" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">What is ISO/IEC 42001?</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                ISO/IEC 42001 is the international standard for establishing an AI Management System (AIMS) that governs how AI is designed, used, and overseen across its lifecycle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="why-matters" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Why It Matters to Leadership</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                ISO/IEC 42001 provides a management-owned governance structure for AI. It clarifies decision rights, risk ownership, accountability, and assurance.
              </AccordionContent>
            </AccordionItem>

            {/* What It Looks Like - Clickable Card with Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-card border border-border rounded-xl px-6 py-4 cursor-pointer hover:bg-accent/50 transition-colors">
                  <h3 className="text-base font-semibold text-foreground">What It Looks Like</h3>
                  <p className="text-muted-foreground text-sm mt-1">Click to view the AIMS dashboard</p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <img
                  src={aimsDashboard}
                  alt="AIMS Dashboard - AI Governance at a glance"
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </Accordion>

          {/* Clause-by-Clause Section */}
          <Accordion type="multiple" className="space-y-3">
            <AccordionItem value="clause-4" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 4 — Context</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Establishes the organizational context for AI, including use cases, stakeholders, and the defined scope of AI governance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clause-5" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 5 — Leadership</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Requires executive ownership, a formal AI policy, and clearly assigned roles and responsibilities for AI oversight.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clause-6" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 6 — Planning</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Introduces AI risk assessment, impact assessment, and risk-based planning to ensure AI is deployed deliberately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clause-7" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 7 — Support</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Covers resources, skills, awareness, and documentation needed to operate and govern AI systems effectively.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clause-8" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 8 — Operation</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Applies controls across the AI lifecycle, including development, deployment, and third-party AI use.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clause-9" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 9 — Performance</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Requires monitoring, internal audits, and management review to assess AI performance and governance effectiveness.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clause-10" className="bg-card border border-border rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="text-left">
                  <h3 className="text-base font-semibold text-foreground">Clause 10 — Improvement</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm">
                Drives continual improvement through corrective actions and increasing governance maturity over time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FrameworksTab;