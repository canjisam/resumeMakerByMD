export function usePrintPdf() {
  return (htmlContent, title = '简历') => {
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
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
}
