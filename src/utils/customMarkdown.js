import MarkdownIt from 'markdown-it';
import { aliIconConfig } from '@/config/aliIcons';

// 创建自定义Markdown解析器
export function createCustomMarkdownRenderer() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  // 添加高亮文本插件
  md.inline.ruler.after('emphasis', 'highlight', function(state, silent) {
    let start = state.pos;
    if (state.src.charAt(start) !== '=') return false;
    if (state.src.charAt(start + 1) !== '=') return false;

    let marker = state.src.charAt(start);
    let pos = start + 2;
    let found = false;

    while (pos < state.posMax) {
      if (state.src.charAt(pos) === marker && state.src.charAt(pos + 1) === marker) {
        found = true;
        break;
      }
      pos++;
    }

    if (!found || start + 2 === pos) return false;

    if (!silent) {
      let token = state.push('highlight_open', 'mark', 1);
      token.attrSet('class', 'resume-highlight');

      state.pos = start + 2;
      state.posMax = pos;
      state.md.inline.tokenize(state);

      token = state.push('highlight_close', 'mark', -1);
      
      state.pos = pos + 2;
      state.posMax = state.tokens.length;
    }

    state.pos = pos + 2;
    return true;
  });

  // 添加进度条插件
  md.inline.ruler.after('emphasis', 'progress', function(state, silent) {
    if (state.src.charAt(state.pos) !== '[') return false;

    const labelStart = state.pos + 1;
    let labelEnd = state.src.indexOf(']', labelStart);
    if (labelEnd === -1) return false;

    if (state.src.slice(labelEnd + 1, labelEnd + 10) !== '(percent:') return false;

    const percentStart = labelEnd + 10;
    let percentEnd = state.src.indexOf('%)', percentStart);
    if (percentEnd === -1) return false;

    const label = state.src.slice(labelStart, labelEnd);
    const percent = state.src.slice(percentStart, percentEnd);

    if (!silent) {
      const token = state.push('html_inline', '', 0);
      token.content = `<div class="resume-progress">
        <span class="resume-progress-label">${label}</span>
        <div class="resume-progress-bar">
          <div class="resume-progress-fill" style="width: ${percent}%"></div>
        </div>
      </div>`;
    }

    state.pos = percentEnd + 2;
    return true;
  });

  // 添加图标插件
  md.inline.ruler.after('emphasis', 'icon', function(state, silent) {
    if (state.src.slice(state.pos, state.pos + 6) !== '[icon:') return false;

    const iconStart = state.pos + 6;
    let iconEnd = state.src.indexOf(']', iconStart);
    if (iconEnd === -1) return false;

    const icon = state.src.slice(iconStart, iconEnd);

    if (!silent) {
      const token = state.push('html_inline', '', 0);
      
      // 图标映射
      const iconMap = {
        'github': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        'linkedin': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
        'email': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>',
        'phone': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>',
        'location': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>',
        'website': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>'
      };
      
      // 检查是否为阿里巴巴图标
      if (icon.startsWith('ali:')) {
        const aliIconName = icon.slice(4);
        const iconClass = aliIconConfig.icons[aliIconName] || aliIconName;
        token.content = `<span class="resume-icon"><i class="iconfont icon-${iconClass}"></i></span>`;
      } else if (iconMap[icon]) {
        token.content = `<span class="resume-icon">${iconMap[icon]}</span>`;
      } else {
        token.content = `<span class="resume-icon">[${icon}]</span>`;
      }
    }

    state.pos = iconEnd + 1;
    return true;
  });

  // 处理自定义容器
  function processCustomContainers(html) {
    // 处理卡片
    html = html.replace(/<p>:::card\s+(.*?)<\/p>([\s\S]*?)<p>:::<\/p>/g, (match, title, content) => {
      return `<div class="resume-card">
        <div class="resume-card-title">${title}</div>
        <div class="resume-card-content">${content}</div>
      </div>`;
    });
    
    // 处理时间线
    html = html.replace(/<p>:::timeline<\/p>([\s\S]*?)<p>:::<\/p>/g, (match, content) => {
      return `<div class="resume-timeline">${content}</div>`;
    });
    
    // 处理双栏布局
    let splitContent = '';
    let splitCount = 0;
    
    html = html.replace(/<p>:::split<\/p>([\s\S]*?)(?:<p>:::split<\/p>|<p>:::<\/p>)/g, (match, content, offset, string) => {
      splitCount++;
      splitContent += `<div class="resume-split">${content}</div>`;
      
      // 如果是最后一个分割块，或者下一个标记是结束标记
      if (string.slice(offset + match.length, offset + match.length + 10).includes(':::')) {
        const result = `<div class="resume-split-container">${splitContent}</div>`;
        splitContent = '';
        splitCount = 0;
        return result;
      }
      
      return '';
    });
    
    return html;
  }

  return {
    render: function(content) {
      let html = md.render(content);
      return processCustomContainers(html);
    }
  };
}