import { useCallback } from "react";

export const usePrintAllAgenda = () => {
  const printAllAgendaTabs = useCallback(() => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups for this site to print to PDF');
      return;
    }

    // Get all stylesheets from the current document
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          // Handle cross-origin stylesheets
          if (styleSheet.href) {
            return `@import url("${styleSheet.href}");`;
          }
          return '';
        }
      })
      .join('\n');

    // Build the content for each tab/section
    const agendaContent = `
      <!-- Page 1: TPRM Agent -->
      <div class="print-page">
        <div class="section-header">
          <h2>TPRM Agent</h2>
          <p>Meet your AI-powered Third-Party Risk Management assistant</p>
        </div>
        <div class="section-content centered">
          <div class="agent-card">
            <div class="agent-avatar">
              <div class="avatar-placeholder">Vicki</div>
            </div>
            <h3>Vicki</h3>
            <p>Vendor Risk Manager</p>
          </div>
        </div>
      </div>

      <!-- Page 2: AI in Banking Today -->
      <div class="print-page page-break">
        <div class="section-header">
          <h2>AI in Banking Today</h2>
          <p>Plain-English view of how banks are using AI now</p>
        </div>
        <div class="section-content">
          <div class="accordion-expanded">
            <h4>Level Set: AI Model Types</h4>
            <p class="accordion-description">[Visual diagram showing AI, Machine Learning, Deep Learning, Generative AI, and Large Language Models as nested layers]</p>
          </div>
          <div class="accordion-expanded">
            <h4>What's an AI Agent?</h4>
            <div class="info-box">
              <h5>AI Assistant</h5>
              <p>AI that generates unique content—research summaries, documents, presentations, and more.</p>
              <p class="example">Example: "Draft a policy summary"</p>
            </div>
            <div class="info-box">
              <h5>Agentic AI</h5>
              <p>AI that helps you make decisions but relies on you to "pull the trigger." It recommends; you act.</p>
              <p class="example">Example: "Recommend next best action"</p>
            </div>
            <div class="info-box">
              <h5>AI Agent</h5>
              <p>Acts in a principal/agent relationship—can make decisions and take actions on your behalf within defined boundaries.</p>
              <p class="example">Example: "Execute approved workflow"</p>
            </div>
            <p class="note"><strong>Note:</strong> People define "agent" differently. Focus on the value delivered, not the label used.</p>
          </div>
          <div class="accordion-expanded">
            <h4>Typical Community Bank Right Now</h4>
            <ul>
              <li><strong>Exploratory:</strong> Still not taking AI use cases to production</li>
              <li><strong>Content developers:</strong> Largely using AI to create content (emails, documents, summaries)</li>
              <li><strong>Thought partners:</strong> Few are using AI as a consistent sounding board for decisions</li>
              <li><strong>Awareness without action:</strong> Understand they "need" to implement AI—don't want to fall behind but don't know where to start</li>
              <li><strong>Lack of KPIs:</strong> No clear measures for value from AI; unable to define what success looks like</li>
            </ul>
          </div>
          <div class="accordion-expanded">
            <h4>AI Tools Currently in Use</h4>
            <ul>
              <li><strong>Copilot leads:</strong> Most are leveraging Copilot, but limited to a small number of licenses with minimal organization around managing AI</li>
              <li><strong>Policies exist:</strong> Majority have an AI policy; minority have it tailored specifically to the organization</li>
              <li><strong>Custom agents:</strong> Some using custom agents from Copilot or ChatGPT within the organization</li>
              <li><strong>Agentic workflows:</strong> Very few creating agentic workflows or autonomous agents</li>
              <li><strong>Vendor-driven AI:</strong> Vendors incorporating AI into fraud prevention and analytics; user-facing AI is primarily chatbots</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Page 3: Frameworks for Success -->
      <div class="print-page page-break">
        <div class="section-header">
          <h2>Frameworks for Success</h2>
          <p>A practical structure for safely introducing AI into your bank</p>
        </div>
        <div class="section-content two-column">
          <div class="column">
            <h3>8-Phase AI Enablement Framework</h3>
            <p class="subtitle">SM Advisors</p>
            <div class="phase-list">
              <div class="phase"><span class="phase-num">0</span> Organizational Readiness Assessment</div>
              <div class="phase"><span class="phase-num">1</span> Strategic Alignment & Leadership Enablement</div>
              <div class="phase"><span class="phase-num">2</span> Strategic Opportunity Identification & Prioritization</div>
              <div class="phase"><span class="phase-num">3</span> Risk Governance & Mitigation</div>
              <div class="phase"><span class="phase-num">4</span> Feasibility Analysis & Technical Enablement</div>
              <div class="phase"><span class="phase-num">5</span> Implementation & Ethical Scaling</div>
              <div class="phase"><span class="phase-num">6</span> Talent & Cultural Transformation</div>
              <div class="phase"><span class="phase-num">7</span> Continuous Improvement & Value Measurement</div>
            </div>
          </div>
          <div class="column">
            <h3>AI Governance Framework</h3>
            <p class="subtitle">Aligned to ISO/IEC 42001</p>
            <div class="accordion-expanded compact">
              <h5>What is ISO/IEC 42001?</h5>
              <p>ISO/IEC 42001 is the international standard for establishing an AI Management System (AIMS) that governs how AI is designed, used, and overseen across its lifecycle.</p>
            </div>
            <div class="accordion-expanded compact">
              <h5>Why It Matters to Leadership</h5>
              <p>ISO/IEC 42001 provides a management-owned governance structure for AI. It clarifies decision rights, risk ownership, accountability, and assurance.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Page 4: ISO Clauses (expanded) -->
      <div class="print-page page-break">
        <div class="section-header">
          <h2>ISO/IEC 42001 Clauses</h2>
          <p>Clause-by-Clause Governance View</p>
        </div>
        <div class="section-content clause-grid">
          <div class="clause-item">
            <h5>Clause 4 — Context</h5>
            <p>Establishes the organizational context for AI, including use cases, stakeholders, and the defined scope of AI governance.</p>
          </div>
          <div class="clause-item">
            <h5>Clause 5 — Leadership</h5>
            <p>Requires executive ownership, a formal AI policy, and clearly assigned roles and responsibilities for AI oversight.</p>
          </div>
          <div class="clause-item">
            <h5>Clause 6 — Planning</h5>
            <p>Introduces AI risk assessment, impact assessment, and risk-based planning to ensure AI is deployed deliberately.</p>
          </div>
          <div class="clause-item">
            <h5>Clause 7 — Support</h5>
            <p>Covers resources, skills, awareness, and documentation needed to operate and govern AI systems effectively.</p>
          </div>
          <div class="clause-item">
            <h5>Clause 8 — Operation</h5>
            <p>Applies controls across the AI lifecycle, including development, deployment, and third-party AI use.</p>
          </div>
          <div class="clause-item">
            <h5>Clause 9 — Performance</h5>
            <p>Requires monitoring, internal audits, and management review to assess AI performance and governance effectiveness.</p>
          </div>
          <div class="clause-item">
            <h5>Clause 10 — Improvement</h5>
            <p>Drives continual improvement through corrective actions and increasing governance maturity over time.</p>
          </div>
        </div>
      </div>

      <!-- Page 5: Personalized AI -->
      <div class="print-page page-break">
        <div class="section-header">
          <h2>Personalized AI</h2>
          <p>Getting decision-grade answers from AI</p>
        </div>
        <div class="section-content">
          <div class="subsection-header">
            <h3>Friction & Chaos</h3>
            <p>Two forces limit AI value creation. Understanding both is the first step.</p>
          </div>
          <div class="two-column">
            <div class="concept-card">
              <h4>Friction</h4>
              <p class="concept-desc">The inability to reliably get from prompt to useful outcome</p>
              <h5>What it causes:</h5>
              <ul>
                <li>Frustration</li>
                <li>Narrower use</li>
                <li>Lower return rate</li>
              </ul>
              <h5>What it looks like:</h5>
              <ul>
                <li>Drafts that need heavy editing</li>
                <li>Uncertainty about accuracy</li>
                <li>Unclear how to use safely</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>Chaos</h4>
              <p class="concept-desc">Overwhelm from speed, noise, and ambiguity</p>
              <h5>What it causes:</h5>
              <ul>
                <li>Intimidation</li>
                <li>Avoidance</li>
                <li>"I can't keep up"</li>
              </ul>
              <h5>What it looks like:</h5>
              <ul>
                <li>Tool sprawl</li>
                <li>Rumor-driven narratives</li>
                <li>Inconsistent practices</li>
                <li>Uncertainty about what's allowed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Page 6: SM Advisors Services -->
      <div class="print-page page-break">
        <div class="section-header">
          <h2>How SM Advisors Helps</h2>
          <p>AI-powered advisory services for community banks</p>
        </div>
        <div class="section-content services-grid">
          <div class="service-card">
            <h4>AI Education Session</h4>
            <p class="service-duration">2-Hour Executive Working Session</p>
            <p>A focused, executive-level session to demystify AI, introduce governance, and equip leaders with a clear mental model for responsible AI use.</p>
          </div>
          <div class="service-card">
            <h4>AI Governance Foundation</h4>
            <p class="service-duration">A 30–60 Day Engagement</p>
            <p>Design and implement a lightweight, auditable AI Management & Governance System aligned with ISO 42001 principles.</p>
          </div>
          <div class="service-card">
            <h4>AI Enablement</h4>
            <p class="service-duration">Phased Engagement</p>
            <p>Accelerate hands-on AI adoption with structured enablement programs tailored to your organization's needs.</p>
          </div>
          <div class="service-card">
            <h4>AI Strategy & Roadmap</h4>
            <p class="service-duration">A 60–90 Day Executive Engagement</p>
            <p>Develop a comprehensive AI strategy aligned to business objectives with clear implementation roadmap.</p>
          </div>
        </div>
      </div>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>AI Enablement Meeting Agenda - SM Advisors</title>
          <style>
            ${styles}

            @page {
              size: landscape;
              margin: 0.5in;
            }

            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background: white !important;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              .page-break {
                page-break-before: always;
              }
            }

            body {
              font-family: 'Inter', system-ui, sans-serif;
              background: white;
              color: #1a1a1a;
              margin: 0;
              padding: 0;
            }

            .print-header {
              text-align: center;
              padding: 20px;
              border-bottom: 3px solid #C8B08A;
              margin-bottom: 10px;
              background: linear-gradient(135deg, #0F2D46, #1a4a6e);
              color: white;
            }

            .print-header h1 {
              font-size: 28px;
              font-weight: 700;
              margin: 0 0 8px 0;
            }

            .print-header p {
              margin: 0;
              opacity: 0.9;
            }

            .print-page {
              padding: 20px 40px;
              min-height: 600px;
            }

            .section-header {
              text-align: center;
              margin-bottom: 24px;
              padding-bottom: 16px;
              border-bottom: 2px solid #C8B08A;
            }

            .section-header h2 {
              color: #0F2D46;
              font-size: 28px;
              margin: 0 0 8px 0;
            }

            .section-header p {
              color: #5B6770;
              margin: 0;
            }

            .section-content {
              max-width: 1000px;
              margin: 0 auto;
            }

            .section-content.centered {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 300px;
            }

            .agent-card {
              text-align: center;
              padding: 40px;
              border: 2px solid #C8B08A;
              border-radius: 12px;
              background: #f8f9fa;
            }

            .agent-avatar {
              margin-bottom: 16px;
            }

            .avatar-placeholder {
              width: 120px;
              height: 120px;
              background: linear-gradient(135deg, #0F2D46, #1a4a6e);
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              font-weight: bold;
              margin: 0 auto;
            }

            .agent-card h3 {
              color: #0F2D46;
              margin: 0 0 4px 0;
              font-size: 24px;
            }

            .agent-card p {
              color: #5B6770;
              margin: 0;
            }

            .accordion-expanded {
              background: #f8f9fa;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 12px;
            }

            .accordion-expanded.compact {
              padding: 12px;
              margin-bottom: 8px;
            }

            .accordion-expanded h4 {
              color: #0F2D46;
              margin: 0 0 12px 0;
              font-size: 16px;
            }

            .accordion-expanded h5 {
              color: #0F2D46;
              margin: 0 0 8px 0;
              font-size: 14px;
            }

            .accordion-expanded p {
              color: #5B6770;
              margin: 0 0 12px 0;
              font-size: 13px;
            }

            .accordion-expanded ul {
              margin: 0;
              padding-left: 20px;
              color: #5B6770;
              font-size: 13px;
            }

            .accordion-expanded li {
              margin-bottom: 6px;
            }

            .info-box {
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 10px;
            }

            .info-box h5 {
              color: #0F2D46;
              margin: 0 0 6px 0;
            }

            .info-box p {
              margin: 0;
              font-size: 12px;
            }

            .info-box .example {
              color: #C8B08A;
              font-style: italic;
              margin-top: 4px;
            }

            .note {
              background: rgba(200, 176, 138, 0.1);
              border: 1px solid #C8B08A;
              border-radius: 6px;
              padding: 10px;
              font-size: 12px;
              margin-top: 12px;
            }

            .two-column {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
            }

            .column h3 {
              color: #0F2D46;
              margin: 0 0 4px 0;
              font-size: 18px;
            }

            .column .subtitle {
              color: #5B6770;
              margin: 0 0 16px 0;
              font-size: 13px;
            }

            .phase-list {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 16px;
            }

            .phase {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 10px;
              font-size: 13px;
            }

            .phase-num {
              width: 28px;
              height: 28px;
              background: #0F2D46;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 12px;
              flex-shrink: 0;
            }

            .clause-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }

            .clause-item {
              background: #f8f9fa;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 14px;
            }

            .clause-item h5 {
              color: #0F2D46;
              margin: 0 0 8px 0;
              font-size: 14px;
            }

            .clause-item p {
              color: #5B6770;
              margin: 0;
              font-size: 12px;
            }

            .subsection-header {
              text-align: center;
              margin-bottom: 20px;
            }

            .subsection-header h3 {
              color: #0F2D46;
              margin: 0 0 8px 0;
            }

            .subsection-header p {
              color: #5B6770;
              margin: 0;
            }

            .concept-card {
              background: #0F2D46;
              color: white;
              border-radius: 8px;
              padding: 20px;
            }

            .concept-card h4 {
              margin: 0 0 8px 0;
              font-size: 20px;
            }

            .concept-card .concept-desc {
              opacity: 0.9;
              margin-bottom: 16px;
            }

            .concept-card h5 {
              opacity: 0.7;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin: 12px 0 6px 0;
            }

            .concept-card ul {
              margin: 0;
              padding-left: 16px;
              font-size: 13px;
            }

            .concept-card li {
              margin-bottom: 4px;
              opacity: 0.9;
            }

            .services-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }

            .service-card {
              background: #f8f9fa;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 20px;
            }

            .service-card h4 {
              color: #0F2D46;
              margin: 0 0 4px 0;
              font-size: 16px;
            }

            .service-card .service-duration {
              color: #C8B08A;
              font-size: 12px;
              margin: 0 0 12px 0;
            }

            .service-card p {
              color: #5B6770;
              margin: 0;
              font-size: 13px;
            }

            .print-footer {
              text-align: center;
              padding: 16px;
              border-top: 1px solid #D8DEE4;
              color: #5B6770;
              font-size: 11px;
              margin-top: auto;
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>AI Enablement Meeting Agenda</h1>
            <p>SM Advisors - Your Partner in AI Enablement</p>
          </div>
          ${agendaContent}
          <div class="print-footer">
            © ${new Date().getFullYear()} SM Advisors | Confidential
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for styles to load then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }, []);

  return { printAllAgendaTabs };
};