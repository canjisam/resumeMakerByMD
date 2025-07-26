import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export function PageCounter({ pageBreaks }) {
  const totalPages = pageBreaks.length + 1;

  return (
    <Badge variant="secondary" className="gap-1">
      <FileText className="h-3 w-3" />
      {totalPages} 页
    </Badge>
  );
}