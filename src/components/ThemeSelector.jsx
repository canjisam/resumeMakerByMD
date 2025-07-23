import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const themes = [
  { id: 'modern', name: '现代简约', color: '#3498db' },
  { id: 'creative', name: '创意设计', color: '#667eea' },
  { id: 'minimal', name: '极简风格', color: '#333333' },
  { id: 'professional', name: '商务正式', color: '#000000' },
  { id: 'tech', name: '技术极客', color: '#58a6ff' },
];

export function ThemeSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <div className="flex items-center gap-2">
      <Palette className="h-4 w-4" />
      <div className="flex gap-1">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            variant={selectedTemplate === theme.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTemplate(theme.id)}
            style={{ 
              backgroundColor: selectedTemplate === theme.id ? theme.color : undefined,
              borderColor: theme.color,
              color: selectedTemplate === theme.id ? 'white' : theme.color
            }}
          >
            {theme.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
