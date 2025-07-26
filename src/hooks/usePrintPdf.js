export function usePrintPdf() {
  return (htmlContent, title = '简历', styles = {}) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            @media print {
              body { margin: 0; }
              @page { margin: 2cm; }
            }
            .container {
              font-size: ${styles.fontSize || '14px'};
              line-height: ${styles.lineHeight || 1.6};
            }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
}
