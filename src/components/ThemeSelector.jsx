import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const themes = [
  { id: 'minimal', name: '简约', color: '#333333', description: '清新简约的设计风格' },
  { id: 'professional', name: '专业', color: '#2c5282', description: '正式的商务风格' },
  { id: 'creative', name: '创意', color: '#667eea', description: '充满活力的设计风格' },
  { id: 'tech', name: '科技', color: '#58a6ff', description: '现代技术风格' },
  { id: 'modern', name: '现代', color: '#3498db', description: '时尚现代的设计' },
];

export function ThemeSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
      <Palette className="h-4 w-4 text-gray-500" />
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <TooltipProvider key={theme.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
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
              </TooltipTrigger>
              <TooltipContent>
                <p>{theme.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
