import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useResumeStore } from '@/store/resumeStore';

export function StyleControl() {
  const { exportStyles, setExportStyles } = useResumeStore();

  const handleFontSizeChange = (value) => {
    setExportStyles({
      ...exportStyles,
      fontSize: `${value[0]}px`,
    });
  };

  const handleLineHeightChange = (value) => {
    setExportStyles({
      ...exportStyles,
      lineHeight: value[0],
    });
  };

  return (
    <div className="flex items-center gap-8 px-4 py-2 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-4 min-w-[200px]">
        <Label className="min-w-[5rem]">字体大小: {parseInt(exportStyles.fontSize)}px</Label>
        <Slider
          value={[parseInt(exportStyles.fontSize)]}
          min={12}
          max={20}
          step={1}
          onValueChange={handleFontSizeChange}
          onValueCommit={handleFontSizeChange}
          className="flex-1"
        />
      </div>
      <div className="flex items-center gap-4 min-w-[200px]">
        <Label className="min-w-[5rem]">行间距: {exportStyles.lineHeight}</Label>
        <Slider
          value={[exportStyles.lineHeight]}
          min={1.2}
          max={2}
          step={0.1}
          onValueChange={handleLineHeightChange}
          onValueCommit={handleLineHeightChange}
          className="flex-1"
        />
      </div>
    </div>
  );
}