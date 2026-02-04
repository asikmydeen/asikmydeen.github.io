// Utility function to get clean HTML for export
function getResumeHTML() {
    const clone = document.querySelector('.resume').cloneNode(true);
    clone.querySelectorAll('.no-print').forEach(el => el.remove());
    return clone.outerHTML;
}

// Download as PDF (triggers print dialog)
function downloadPDF() {
    const printWindow = window.open('', '_blank', 'width=900,height=1200');
    const stylesLink = '<link rel="stylesheet" href="styles.css">';
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Asik Mydeen - Resume</title>
            ${stylesLink}
        </head>
        <body>
            ${getResumeHTML()}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
}

// Download as Word document
function downloadWord() {
    const htmlContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" 
              xmlns:w="urn:schemas-microsoft-com:office:word" 
              xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <title>Asik Mydeen - Resume</title>
            <style>
                /* Optimized Word export styles - minimal spacing */
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Segoe UI', Arial, sans-serif; 
                    font-size: 10pt; 
                    line-height: 1.3; 
                    margin: 0; 
                    padding: 0;
                }
                
                /* Header */
                .header { 
                    background: #2563eb; 
                    color: white; 
                    padding: 8pt 10pt 6pt; 
                    text-align: center; 
                }
                .name { 
                    font-size: 18pt; 
                    font-weight: bold; 
                    margin-bottom: 2pt;
                    line-height: 1.2;
                }
                .title { 
                    font-size: 11pt; 
                    margin-bottom: 4pt;
                    line-height: 1.2;
                }
                .contact-grid {
                    margin-top: 4pt;
                }
                .contact-item { 
                    font-size: 8pt; 
                    background: rgba(255, 255, 255, 0.2); 
                    padding: 2pt 4pt; 
                    margin: 2pt 3pt;
                    display: inline-block;
                }
                .export-actions { display: none; }
                
                /* Main content */
                .main { 
                    padding: 6pt 10pt; 
                }
                
                /* Sections */
                .section { 
                    margin-bottom: 8pt; 
                    page-break-inside: avoid;
                }
                .section-title { 
                    color: #2563eb; 
                    font-size: 10pt; 
                    font-weight: bold;
                    border-bottom: 1.5pt solid #2563eb; 
                    padding-bottom: 2pt; 
                    margin-bottom: 4pt;
                    line-height: 1.2;
                }
                
                /* Summary */
                .summary-text { 
                    font-size: 9pt; 
                    line-height: 1.35; 
                    margin-bottom: 3pt;
                }
                .highlight-tags { 
                    margin-top: 3pt; 
                }
                .tag { 
                    display: inline-block; 
                    font-size: 7pt; 
                    padding: 1pt 4pt; 
                    background: #eef2ff; 
                    margin: 1pt 2pt;
                    border-radius: 2pt;
                }
                
                /* Skills */
                .skills-container { 
                    display: table;
                    width: 100%;
                }
                .skill-category { 
                    padding: 3pt 4pt; 
                    margin-bottom: 3pt;
                    page-break-inside: avoid;
                }
                .skill-category-title { 
                    font-size: 8pt; 
                    font-weight: bold; 
                    color: #2563eb; 
                    margin-bottom: 2pt;
                    line-height: 1.2;
                }
                .skill-item { 
                    display: inline-block; 
                    font-size: 7pt; 
                    padding: 1pt 3pt; 
                    margin: 1pt 2pt; 
                    border: 0.5pt solid #d1d5db;
                    border-radius: 2pt;
                }
                
                /* Projects */
                .project-item { 
                    padding: 4pt 5pt; 
                    margin-bottom: 5pt;
                    page-break-inside: avoid;
                }
                .project-header h3 { 
                    font-size: 9pt; 
                    margin-bottom: 2pt;
                    line-height: 1.2;
                }
                .project-link { 
                    font-size: 7pt; 
                    color: #2563eb;
                }
                .project-description { 
                    font-size: 8pt; 
                    line-height: 1.4; 
                    margin-bottom: 3pt;
                }
                .project-tag { 
                    display: inline-block; 
                    font-size: 6pt; 
                    padding: 1pt 3pt; 
                    background: #eef2ff;
                    margin: 1pt 1pt;
                    border-radius: 2pt;
                }
                
                /* Experience */
                .job { 
                    margin-bottom: 6pt; 
                    padding-bottom: 4pt; 
                    border-bottom: 0.5pt solid #e5e7eb;
                    page-break-inside: avoid;
                }
                .job-header { 
                    margin-bottom: 3pt; 
                }
                .job-title { 
                    font-size: 9pt; 
                    font-weight: bold;
                    line-height: 1.2;
                    margin-bottom: 1pt;
                }
                .job-company { 
                    font-size: 8pt; 
                    color: #4b5563;
                    line-height: 1.2;
                }
                .job-period { 
                    font-size: 8pt; 
                    color: #7c3aed; 
                    font-weight: bold;
                    line-height: 1.2;
                }
                .job-details { 
                    margin-top: 3pt; 
                    padding-left: 12pt;
                }
                .job-details li { 
                    font-size: 8pt; 
                    line-height: 1.35; 
                    margin-bottom: 2pt;
                }
                
                /* Education */
                .education-item { 
                    padding: 4pt 5pt; 
                    margin-bottom: 4pt; 
                    border-left: 2pt solid #2563eb;
                    page-break-inside: avoid;
                }
                .degree { 
                    font-size: 9pt; 
                    font-weight: bold;
                    line-height: 1.2;
                }
                .institution { 
                    font-size: 8pt; 
                    color: #4b5563;
                    line-height: 1.2;
                    margin-top: 1pt;
                }
                .education-meta { 
                    margin-top: 2pt; 
                }
                .cgpa-badge { 
                    display: inline-block; 
                    font-size: 7pt; 
                    background: #2563eb; 
                    color: white; 
                    padding: 1pt 4pt;
                    border-radius: 2pt;
                    margin-right: 4pt;
                }
                .grad-date { 
                    font-size: 7pt; 
                    color: #6b7280;
                }
                
                /* Footer */
                .footer { 
                    padding: 4pt; 
                    text-align: center; 
                    font-size: 7pt;
                    background: #1f2937;
                    color: white;
                }
            </style>
        </head>
        <body>${getResumeHTML()}</body>
        </html>`;
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Asik-Mydeen-Resume.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// htmx event handlers for smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation when content loads
    document.body.addEventListener('htmx:afterSwap', function(event) {
        event.detail.elt.style.opacity = '0';
        setTimeout(() => {
            event.detail.elt.style.transition = 'opacity 0.3s ease-in';
            event.detail.elt.style.opacity = '1';
        }, 10);
    });
    
    // Show loading indicator during requests
    document.body.addEventListener('htmx:beforeRequest', function(event) {
        const target = event.detail.elt;
        if (target.classList.contains('section')) {
            target.style.opacity = '0.5';
        }
    });
    
    // Remove loading indicator after completion
    document.body.addEventListener('htmx:afterRequest', function(event) {
        const target = event.detail.elt;
        if (target.classList.contains('section')) {
            target.style.opacity = '1';
        }
    });
});
