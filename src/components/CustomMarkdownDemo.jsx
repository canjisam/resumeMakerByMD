import React, { useEffect, useState } from 'react';
import { renderHtml } from '../utils/renderHtml';
import exampleMarkdown from '../examples/customMarkdownExample.md?raw';

const CustomMarkdownDemo = () => {
  const [html, setHtml] = useState('');
  const [activeTheme, setActiveTheme] = useState('default');

  useEffect(() => {
    // 创建一个基本的HTML模板
    const template = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
          }
          h1 {
            font-size: 2em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
          }
          h2 {
            font-size: 1.5em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
          }
          p {
            margin: 1em 0;
          }
          ul, ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          li {
            margin: 0.5em 0;
          }
          a {
            color: #0366d6;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          code {
            font-family: 'Courier New', Courier, monospace;
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.9em;
          }
          pre {
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 3px;
            overflow: auto;
          }
          pre code {
            background-color: transparent;
            padding: 0;
          }
          blockquote {
            margin: 1em 0;
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
          }
          img {
            max-width: 100%;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          table th, table td {
            padding: 6px 13px;
            border: 1px solid #dfe2e5;
          }
          table th {
            background-color: #f6f8fa;
            font-weight: 600;
          }
          hr {
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
          }
          
          /* 主题样式 */
          body.theme-creative {
            background-color: #f9f9f9;
            color: #333;
            font-family: 'Georgia', serif;
          }
          body.theme-creative h1, body.theme-creative h2 {
            color: #667eea;
            border-bottom-color: #667eea;
          }
          
          body.theme-tech {
            background-color: #0d1117;
            color: #c9d1d9;
            font-family: 'Consolas', monospace;
          }
          body.theme-tech h1, body.theme-tech h2 {
            color: #58a6ff;
            border-bottom-color: #30363d;
          }
          body.theme-tech a {
            color: #58a6ff;
          }
          body.theme-tech code {
            background-color: #161b22;
          }
          body.theme-tech pre {
            background-color: #161b22;
          }
          body.theme-tech blockquote {
            color: #8b949e;
            border-left-color: #30363d;
          }
          body.theme-tech table th, body.theme-tech table td {
            border-color: #30363d;
          }
          body.theme-tech table th {
            background-color: #161b22;
          }
          body.theme-tech hr {
            background-color: #30363d;
          }
        </style>
      </head>
      <body class="theme-${activeTheme}">
        <%= body %>
      </body>
      </html>
    `;

    // 渲染Markdown为HTML
    const renderedHtml = renderHtml(exampleMarkdown, template);
    setHtml(renderedHtml);
  }, [activeTheme]);

  return (
    <div className="custom-markdown-demo">
      <div className="theme-selector">
        <h3>选择主题：</h3>
        <div className="theme-buttons">
          <button 
            className={activeTheme === 'default' ? 'active' : ''} 
            onClick={() => setActiveTheme('default')}
          >
            默认主题
          </button>
          <button 
            className={activeTheme === 'creative' ? 'active' : ''} 
            onClick={() => setActiveTheme('creative')}
          >
            创意主题
          </button>
          <button 
            className={activeTheme === 'tech' ? 'active' : ''} 
            onClick={() => setActiveTheme('tech')}
          >
            科技主题
          </button>
        </div>
      </div>
      
      <div className="preview-container">
        <h2>预览效果</h2>
        <iframe
          title="Custom Markdown Preview"
          srcDoc={html}
          style={{
            width: '100%',
            height: '600px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div className="markdown-source">
        <h2>Markdown源码</h2>
        <pre style={{ 
          backgroundColor: '#f6f8fa', 
          padding: '16px', 
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          <code>{exampleMarkdown}</code>
        </pre>
      </div>
      
      <style jsx>{`
        .custom-markdown-demo {
          padding: 20px;
        }
        
        .theme-selector {
          margin-bottom: 20px;
        }
        
        .theme-buttons {
          display: flex;
          gap: 10px;
        }
        
        .theme-buttons button {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background-color: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .theme-buttons button:hover {
          background-color: #e0e0e0;
        }
        
        .theme-buttons button.active {
          background-color: #0366d6;
          color: white;
          border-color: #0366d6;
        }
        
        .preview-container {
          margin-bottom: 30px;
        }
        
        h2 {
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eaecef;
        }
      `}</style>
    </div>
  );
};

export default CustomMarkdownDemo;