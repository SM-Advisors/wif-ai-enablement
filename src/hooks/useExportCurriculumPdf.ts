import { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Session {
  title: string;
  theme?: string;
  outcomes?: string[];
  topics?: string[];
  agenda?: string[];
  homework?: string[];
  session_number: number;
  duration_minutes: number;
}

interface SessionNote {
  status?: string;
  trainer_notes?: string | null;
  client_notes?: string | null;
  decisions?: string | null;
  action_items?: string | null;
  risks_open_questions?: string | null;
}

interface InstructorContent {
  notes_markdown?: string | null;
}

const statusLabels: Record<string, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  complete: "Complete",
  locked: "Locked",
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const markdownToHtml = (md: string) => {
  let html = escapeHtml(md);
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");
  // Inline code
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");
  // Headings
  html = html.replace(/^## (.+)$/gm, '<h4 class="md-h2">$1</h4>');
  // Ordered lists
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="md-ol">$2</li>');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="md-ul">$1</li>');
  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>');
  // Divider
  html = html.replace(/^---$/gm, '<hr class="md-hr"/>');
  // Paragraphs (double newline)
  html = html.replace(/\n\n/g, "</p><p>");
  // Single newline to <br>
  html = html.replace(/\n/g, "<br/>");
  return `<p>${html}</p>`;
};

const formatArray = (items?: string[]) =>
  items && items.length > 0 ? items : [];

export const useExportCurriculumPdf = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdf = useCallback(
    async (
      programName: string,
      sessions: Session[],
      sessionNotes: SessionNote[],
      instructorContent?: Record<string, string>
    ) => {
      setIsExporting(true);
      try {
        const today = new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const listItems = (items?: string[]) =>
          formatArray(items).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

        // Build HTML for each session
        const sessionsHtml = sessions
          .map((session, idx) => {
            const pageBreak = idx > 0 ? "page-break" : "";
            const note = sessionNotes[idx];
            const instructorNotes = instructorContent ? instructorContent[`session_${session.session_number}`] : null;

            const status = note?.status || "not_started";

            // Instructor notes section
            let instructorSection = "";
            if (instructorNotes?.trim()) {
              instructorSection = `
                <div class="section instructor-section">
                  <h3>📝 Instructor Notes</h3>
                  <div class="instructor-notes-text">${markdownToHtml(instructorNotes)}</div>
                </div>`;
            }

            // Session notes section
            let sessionNotesSection = "";
            const noteFields = [
              { label: "Decisions", value: note?.decisions },
              { label: "Action Items", value: note?.action_items },
              { label: "Risks & Open Questions", value: note?.risks_open_questions },
              { label: "Client Notes", value: note?.client_notes },
              { label: "Trainer Notes", value: note?.trainer_notes },
            ].filter((f) => f.value?.trim());

            if (noteFields.length > 0) {
              const fieldsHtml = noteFields
                .map(
                  (f) =>
                    `<div class="note-field"><h4>${f.label}</h4><p>${escapeHtml(f.value!)}</p></div>`
                )
                .join("");
              sessionNotesSection = `<div class="section"><h3>Session Notes</h3>${fieldsHtml}</div>`;
            }

            const outcomes = listItems(session.outcomes);
            const topics = listItems(session.topics);
            const agenda = listItems(session.agenda);
            const homework = listItems(session.homework);

            return `
            <div class="session-page ${pageBreak}">
              <div class="session-header">
                <div class="session-title-row">
                  <h2>${escapeHtml(session.title)}</h2>
                  <span class="status-badge status-${status}">Session ${session.session_number}</span>
                </div>
                ${session.theme ? `<p class="session-focus">${escapeHtml(session.theme)}</p>` : ""}
              </div>

              ${session.outcomes && session.outcomes.length > 0 ? `
                <div class="section">
                  <h3>Learning Outcomes</h3>
                  <ul>${outcomes}</ul>
                </div>
              ` : ""}

              ${session.topics && session.topics.length > 0 ? `
                <div class="section">
                  <h3>Topics</h3>
                  <ul>${topics}</ul>
                </div>
              ` : ""}

              ${session.agenda && session.agenda.length > 0 ? `
                <div class="section">
                  <h3>Agenda</h3>
                  <ol>${agenda}</ol>
                </div>
              ` : ""}

              ${session.homework && session.homework.length > 0 ? `
                <div class="section">
                  <h3>Homework</h3>
                  <ul>${homework}</ul>
                </div>
              ` : ""}

              ${instructorSection}
              ${sessionNotesSection}
            </div>`;
          })
          .join("");

        const printWindow = window.open("", "_blank");
        if (!printWindow) {
          toast({
            title: "Popup blocked",
            description: "Please allow popups to export PDF.",
            variant: "destructive",
          });
          setIsExporting(false);
          return;
        }

        printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${escapeHtml(programName)} - Curriculum</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    @page {
      size: letter portrait;
      margin: 0.6in 0.75in;
    }

    @media print {
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .page-break { page-break-before: always; }
      .no-break { page-break-inside: avoid; }
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #1a1a2e;
      background: #fff;
      font-size: 11px;
      line-height: 1.6;
    }

    /* Cover page */
    .cover {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 92vh;
      text-align: center;
      padding: 60px 40px;
    }

    .cover-logo {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #ea6a2f;
      margin-bottom: 40px;
    }

    .cover h1 {
      font-size: 36px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .cover .subtitle {
      font-size: 16px;
      color: #5b6770;
      margin-bottom: 48px;
    }

    .cover-divider {
      width: 80px;
      height: 3px;
      background: #ea6a2f;
      margin: 0 auto 48px;
    }

    .cover-meta {
      font-size: 12px;
      color: #5b6770;
    }

    .cover-meta strong { color: #1a1a2e; }

    /* Session pages */
    .session-page { padding: 0; }

    .session-header {
      background: #1a1a2e;
      color: #fff;
      padding: 20px 28px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .session-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .session-header h2 {
      font-size: 20px;
      font-weight: 700;
    }

    .session-focus {
      margin-top: 6px;
      font-size: 12px;
      opacity: 0.8;
    }

    .status-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      background: #ea6a2f;
      color: #fff;
    }

    /* Sections */
    .section {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .section h3 {
      font-size: 14px;
      font-weight: 700;
      color: #1a1a2e;
      padding-bottom: 6px;
      border-bottom: 2px solid #ea6a2f;
      margin-bottom: 10px;
    }

    .section p {
      color: #374151;
      white-space: pre-line;
    }

    .section ol, .section ul {
      padding-left: 20px;
      color: #374151;
    }

    .section li {
      margin-bottom: 5px;
      white-space: pre-line;
    }

    /* Instructor notes */
    .instructor-section {
      background: #faf8f5;
      border: 1px solid #e5ddd3;
      border-radius: 8px;
      padding: 16px 20px;
    }

    .instructor-section h3 {
      border-bottom-color: #c8a882;
    }

    .instructor-notes-text p { color: #374151; }
    .instructor-notes-text code {
      background: #f3f4f6;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 10px;
    }

    .instructor-notes-text .md-h2 {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a2e;
      margin: 10px 0 4px;
    }

    .instructor-notes-text .md-quote {
      border-left: 3px solid #ea6a2f;
      padding-left: 10px;
      color: #5b6770;
      font-style: italic;
      margin: 6px 0;
    }

    .instructor-notes-text .md-hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 12px 0;
    }

    /* Session notes */
    .note-field {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 8px;
    }

    .note-field h4 {
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .note-field p { color: #374151; white-space: pre-line; }

    /* Footer */
    .doc-footer {
      text-align: center;
      padding-top: 24px;
      margin-top: 40px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover">
    <div class="cover-logo">SM Advisors</div>
    <h1>Curriculum Report</h1>
    <p class="subtitle">${escapeHtml(programName)}</p>
    <div class="cover-divider"></div>
    <div class="cover-meta">
      <p>Prepared: <strong>${today}</strong></p>
      <p>${sessions.length} Session${sessions.length !== 1 ? "s" : ""}</p>
    </div>
  </div>

  ${sessionsHtml}

  <div class="doc-footer">
    © ${new Date().getFullYear()} SM Advisors · Confidential · Prepared ${today}
  </div>
</body>
</html>`);

        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          setIsExporting(false);
        }, 600);
      } catch (error) {
        console.error("Export error:", error);
        toast({
          title: "Export failed",
          description: "Could not generate PDF. Please try again.",
          variant: "destructive",
        });
        setIsExporting(false);
      }
    },
    []
  );

  return { exportPdf, isExporting };
};