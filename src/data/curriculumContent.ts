// Session curriculum content - displayed exactly as provided
export const SESSION_CONTENT = {
  session1: {
    title: "Session 1 — Feb 10, 2026 (2 hours)",
    focus: "Copilot personalization + governance workspace setup",
    purpose: `Establish Microsoft 365 Copilot as Ricky's personalized AI workspace and create a single AIMS notebook that will serve as the system of record for governance thinking, assumptions, inputs, and decisions. This session prioritizes personalization and co-creation over instruction.`,
    howSessionIsRun: [
      "Frame the session as building Ricky's personal AI operating system, not teaching AI concepts.",
      "Configure Copilot personalization live so responses are bank-grade, risk-aware, and regulator-safe.",
      "Create a dedicated Copilot notebook titled for BankMiami's AI Governance / AIMS.",
      "Capture engagement context, exam timing, assumptions, known AI usage, and open questions directly into the notebook.",
      "Design (within Copilot) an 'agent instruction' construct that can be used later to specify requirements for future agents.",
      "Begin capturing high-level AIMS elements (scope, objectives, known risks) inside the notebook so Copilot can reason across them.",
    ],
    deliverables: [
      "Personalized Copilot prompt configuration for Ricky",
      "AIMS notebook established and populated with real content",
      "Draft agent-instruction framework (conceptual)",
    ],
    homeworkBank: [
      "Continue using the notebook for AI-related thinking",
      "Add Woolen Labs notes and questions as they arise",
      "Locate current vendor due diligence questionnaire",
    ],
    prepSM: [
      "Review notebook asynchronously",
      "Draft initial AI policy outline using notebook content",
      "Draft AI-specific vendor due diligence questions",
    ],
  },
  session2: {
    title: "Session 2 — Feb 12, 2026 (1–1.5 hours)",
    focus: "Third-party AI input via TPRM (control augmentation)",
    purpose: `Augment the Bank's existing Third Party Risk Management (TPRM) questionnaire with AI-specific questions and clearly position those outputs as inputs into the AIMS, not the governance system itself.`,
    howSessionIsRun: [
      "Re-anchor in the AIMS notebook and validate current third-party AI understanding.",
      "Explicitly distinguish architecture:\n• TPRM = existing vendor control (augmented)\n• AIMS = separate, ongoing governance system",
      "Review AI question categories (models, data, hosting, access, monitoring, change management, subcontractors) at an intent level.",
      "Discuss how to assess responses: what is acceptable, what raises flags, when to escalate.",
      "Use Woolen Labs as an illustrative example, without completing a full questionnaire live.",
      "Document how TPRM outputs flow into the AIMS (inventory, risk assessment, monitoring).",
      "Lightly align AI policy language to reflect this structure.",
    ],
    deliverables: [
      "AI question set ready for insertion into vendor questionnaire",
      "Documented flow from TPRM → AIMS captured in notebook",
      "Updated AI policy draft (structural alignment only)",
    ],
    homeworkBank: [
      "Embed AI questions into standard vendor questionnaire",
      "Send updated questionnaire to Woolen Labs",
      "Capture responses and assumptions in the AIMS notebook",
    ],
    prepSM: [
      "Refine policy language",
      "Draft AI risk / impact assessment approach",
      "Draft AIMS lifecycle outline",
    ],
  },
  session3: {
    title: "Session 3 — Feb 17, 2026 (1–1.5 hours)",
    focus: "Assembling the lite AIMS as a governance system",
    purpose: `Design and operationalize the lite AIMS itself: scope, objectives, lifecycle, roles, inventory, and risk/impact approach—independent of any single vendor or tool.`,
    howSessionIsRun: [
      "Validate all governance inputs now captured in the notebook.",
      "Define formal AIMS objectives aligned to safety, soundness, and proportionality.",
      "Build the AI lifecycle end-to-end (intake → assessment → approval → inventory → monitoring → change → retirement).",
      "Define clear accountability at each lifecycle stage without complex RACI tables.",
      "Finalize AI inventory structure supporting both internal and third-party AI.",
      "Define a lightweight, judgment-based AI risk & impact assessment approach.",
      "Walk a hypothetical AI use case through the full lifecycle to sanity-check the system.",
    ],
    deliverables: [
      "Documented AIMS lifecycle",
      "Role and accountability descriptions",
      "AI inventory template",
      "AI risk & impact assessment approach",
    ],
    homeworkBank: [
      "Populate AI inventory with known use cases",
      "Review policy draft internally (Mary / Compliance)",
    ],
    prepSM: [
      "Compile AIMS handbook draft",
      "Finalize board-ready policy language",
    ],
  },
  session4: {
    title: "Session 4 — Feb 19, 2026 (1 hour)",
    focus: "Finalization, board readiness, examiner confidence",
    purpose: `Finalize the lite AIMS, confirm ownership and operating cadence, and prepare Ricky to confidently explain the system to the Board and examiners.`,
    howSessionIsRun: [
      "Use Copilot to summarize the full AIMS and validate coherence.",
      "Have Ricky narrate the system end-to-end; refine language as needed.",
      "Final review of AI policy at a principle level to ensure board suitability.",
      "Conduct examiner-style Q&A rehearsal using likely questions.",
      "Confirm operating cadence: inventory updates, reviews, escalation triggers.",
      "Review a high-level roadmap for gradual AIMS maturity post-exam.",
    ],
    deliverables: [
      "Final lite AIMS governance handbook",
      "Board-ready AI policy",
      "Examiner readiness talking points",
      "High-level AIMS roadmap",
    ],
    closeOut: `At the conclusion of Session 4, BankMiami will have:
• A complete, proportionate, and auditable lite AIMS
• An AI policy ready for Board approval on Feb 24, 2026
• Documented governance artifacts suitable for examiners
• A trained internal owner capable of operating and explaining the system`,
  },
};
