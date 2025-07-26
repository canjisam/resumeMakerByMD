import { Button } from '@/components/ui/button';
import { FileText, Printer } from 'lucide-react';
import { usePrintPdf } from '@/hooks/usePrintPdf';
import { useExportWord } from '@/hooks/useExportWord';
import { useResumeStore } from '@/store/resumeStore';
import { renderHtml } from '@/utils/renderHtml';
import { ExportStyleControl } from './ExportStyleControl';

export function ExportButtons() {
  const printPdf = usePrintPdf();
  const exportWord = useExportWord();
  const { markdown, templates, selectedTemplate, exportStyles } = useResumeStore();

  const handlePrint = () => {
    const html = renderHtml(markdown, templates[selectedTemplate]);
    printPdf(html, '我的简历', exportStyles);
  };

  const handleExportWord = () => {
    const html = renderHtml(markdown, templates[selectedTemplate]);
    exportWord(html, '我的简历.docx', exportStyles);
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePrint} variant="outline">
        <Printer className="h-4 w-4 mr-2" />
        打印/PDF
      </Button>
      <Button onClick={handleExportWord} variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        导出Word
      </Button>
      <ExportStyleControl />
    </div>
  );
}
