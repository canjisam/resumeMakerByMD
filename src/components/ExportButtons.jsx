import { Button } from '@/components/ui/button';
import { Download, FileText, Printer } from 'lucide-react';
import { usePrintPdf } from '@/hooks/usePrintPdf';
import { useExportWord } from '@/hooks/useExportWord';
import { useResumeStore } from '@/store/resumeStore';
import { renderHtml } from '@/utils/renderHtml';

export function ExportButtons() {
  const printPdf = usePrintPdf();
  const exportWord = useExportWord();
  const { markdown, templates, selectedTemplate } = useResumeStore();

  const handlePrint = () => {
    const html = renderHtml(markdown, templates[selectedTemplate]);
    printPdf(html, '我的简历');
  };

  const handleExportWord = () => {
    const html = renderHtml(markdown, templates[selectedTemplate]);
    exportWord(html, '我的简历.docx');
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handlePrint} variant="outline">
        <Printer className="h-4 w-4 mr-2" />
        打印/PDF
      </Button>
      <Button onClick={handleExportWord} variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        导出Word
      </Button>
    </div>
  );
}
