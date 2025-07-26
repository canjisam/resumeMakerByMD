import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useResumeStore } from '@/store/resumeStore';

export function ExportStyleControl() {
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.6);
  const { setExportStyles } = useResumeStore();

  const handleFontSizeChange = (value) => {
    setFontSize(value[0]);
    updateStyles(value[0], lineHeight);
  };

  const handleLineHeightChange = (value) => {
    setLineHeight(value[0]);
    updateStyles(fontSize, value[0]);
  };

  const updateStyles = (fontSize, lineHeight) => {
    setExportStyles({
      fontSize: `${fontSize}px`,
      lineHeight: lineHeight,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>导出样式设置</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>字体大小: {fontSize}px</Label>
            <Slider
              value={[fontSize]}
              min={12}
              max={20}
              step={1}
              onValueChange={handleFontSizeChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>行间距: {lineHeight}</Label>
            <Slider
              value={[lineHeight]}
              min={1.2}
              max={2}
              step={0.1}
              onValueChange={handleLineHeightChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}