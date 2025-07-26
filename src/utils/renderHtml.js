import MarkdownIt from 'markdown-it';
import ejs from 'ejs';
import { parseFrontMatter } from './parseFrontMatter';
import { createCustomMarkdownRenderer } from './customMarkdown';
import { aliIconConfig } from '@/config/aliIcons';

// 创建自定义Markdown渲染器
const customMd = createCustomMarkdownRenderer();

// 自定义Markdown样式
const customStyles = `
/* 双栏布局 */
.resume-split-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 1rem 0;
}

.resume-split {
  flex: 1;
  min-width: 250px;
}

/* 卡片布局 */
.resume-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.resume-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

/* 时间线 */
.resume-timeline {
  position: relative;
  margin: 20px 0;
  padding-left: 20px;
}

.resume-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e0e0e0;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-marker {
  position: absolute;
  left: -24px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3498db;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #3498db;
}

.timeline-content h3 {
  margin-top: 0;
}

/* 高亮文本 */
.resume-highlight {
  background-color: #fffde7;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 500;
}

/* 进度条 */
.resume-progress {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.resume-progress-label {
  flex: 0 0 100px;
  font-weight: 500;
}

.resume-progress-bar {
  flex: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.resume-progress-fill {
  height: 100%;
  background-color: #3498db;
  border-radius: 4px;
}

/* 图标 */
.resume-icon {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-right: 4px;
}

.resume-icon svg {
  width: 16px;
  height: 16px;
}
`;

export function renderHtml(markdown, template, styles = {}) {
  try {
    // 直接渲染整个Markdown内容，不再分离前置元数据
    const body = customMd.render(markdown);
    
    // 在模板中添加自定义样式和阿里巴巴图标
    if (template) {
      const { fontSize = '14px', lineHeight = 1.6 } = styles;
      const styleTag = `<style id="custom-markdown-styles">
        ${customStyles}
        body {
          font-size: ${fontSize} !important;
          line-height: ${lineHeight} !important;
        }
      </style>`;
      const iconLink = `<link rel="stylesheet" href="${aliIconConfig.cssUrl}">`;
      template = template.replace('</head>', `${styleTag}${iconLink}</head>`);
    }
    
    // 只使用body数据，不再使用前置元数据
    const templateData = { body };

    return ejs.render(template, templateData);
  } catch (error) {
    console.error('渲染HTML时出错:', error);
    return `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: red;">渲染错误</h2>
        <p>错误信息: ${error.message}</p>
        <p>请检查您的Markdown格式是否正确</p>
      </div>
    `;
  }
}