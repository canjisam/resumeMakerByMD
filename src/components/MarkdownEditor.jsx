import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useResumeStore } from '@/store/resumeStore';
import { useDebounce } from '@/hooks/useDebounce';

export function MarkdownEditor() {
  const { markdown, setMarkdown } = useResumeStore();
  const [value, setValue] = useState(markdown);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    setMarkdown(debouncedValue);
  }, [debouncedValue, setMarkdown]);

  return (
    <div className="h-full">
      <MDEditor
        value={value}
        onChange={setValue}
        height="100%"
        preview="edit"
        data-color-mode="light"
      />
    </div>
  );
}
