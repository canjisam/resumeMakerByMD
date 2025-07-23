import { asBlob } from 'html-docx-js-typescript';

export function useExportWord() {
  return async (htmlContent, filename = '简历.docx') => {
    try {
      const blob = await asBlob(htmlContent, { 
        orientation: 'portrait',
        margins: { top: 720, right: 720, bottom: 720, left: 720 }
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出Word失败:', error);
    }
  };
}
