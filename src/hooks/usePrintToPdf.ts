import { useCallback } from "react";

export const usePrintToPdf = () => {
  const printContent = useCallback((contentId: string, title: string) => {
    const content = document.getElementById(contentId);
    if (!content) return;

    // Clone the content
    const clonedContent = content.cloneNode(true) as HTMLElement;
    
    // Expand all accordion items for printing
    const accordionItems = clonedContent.querySelectorAll('[data-state="closed"]');
    accordionItems.forEach((item) => {
      item.setAttribute('data-state', 'open');
      // Find and show hidden content
      const hiddenContent = item.querySelector('[data-state="closed"]');
      if (hiddenContent) {
        hiddenContent.setAttribute('data-state', 'open');
        (hiddenContent as HTMLElement).style.display = 'block';
      }
    });

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

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - SM Advisors</title>
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
              
              .print-content {
                padding: 20px;
                max-width: 100% !important;
              }
              
              /* Ensure backgrounds print */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Page breaks for major sections */
              .page-break {
                page-break-before: always;
              }
              
              /* Ensure accordions are expanded */
              [data-state="closed"] {
                display: block !important;
              }
              
              [data-state="closed"] > div {
                display: block !important;
                height: auto !important;
              }
            }
            
            body {
              font-family: 'Inter', system-ui, sans-serif;
              background: white;
              color: #1a1a1a;
              padding: 20px;
            }
            
            .print-header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 2px solid #C8B08A;
              margin-bottom: 30px;
            }
            
            .print-header h1 {
              color: #0F2D46;
              font-size: 28px;
              font-weight: 700;
              margin: 0;
            }
            
            .print-header p {
              color: #5B6770;
              margin-top: 8px;
            }
            
            .print-footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #D8DEE4;
              margin-top: 30px;
              color: #5B6770;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>${title}</h1>
            <p>SM Advisors - Your Partner in AI Enablement</p>
          </div>
          <div class="print-content">
            ${clonedContent.innerHTML}
          </div>
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

  return { printContent };
};
