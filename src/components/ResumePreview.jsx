import { useMemo } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { renderHtml } from '@/utils/renderHtml';
import { Card } from '@/components/ui/card';

export function ResumePreview() {
  const { markdown, templates, selectedTemplate } = useResumeStore();
  
  const htmlContent = useMemo(() => {
    try {
      const template = templates[selectedTemplate];
      if (!template) {
        throw new Error('未找到选中的模板');
      }
      return renderHtml(markdown, template);
    } catch (error) {
      console.error('简历渲染错误:', error);
      return `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>渲染错误</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 40px;
                background: #f5f5f5;
                color: #333;
              }
              .error-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .error-title {
                color: #e74c3c;
                margin-bottom: 15px;
              }
              .error-message {
                background: #fee;
                padding: 15px;
                border-radius: 4px;
                font-family: monospace;
                font-size: 14px;
                margin: 15px 0;
              }
            </style>
          </head>
          <body>
            <div class="error-container">
              <h2 class="error-title">简历渲染出错</h2>
              <p>很抱歉，渲染简历时遇到了问题。</p>
              <div class="error-message">${error.message}</div>
              <p>请检查：</p>
              <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Markdown格式是否正确</li>
                <li>个人信息是否完整</li>
                <li>模板是否存在</li>
              </ul>
            </div>
          </body>
        </html>
      `;
    }
  }, [markdown, templates, selectedTemplate]);

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-full overflow-auto">
        <iframe
          srcDoc={htmlContent}
          className="w-full h-full border-0"
          title="简历预览"
          sandbox="allow-same-origin"
        />
      </div>
    </Card>
  );
}
