import { useEffect, useState } from 'react';

export function usePageBreaks(iframeRef) {
  const [pageBreaks, setPageBreaks] = useState([]);

  useEffect(() => {
    const calculatePageBreaks = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const doc = iframe.contentDocument;
      if (!doc) return;

      const container = doc.querySelector('.container');
      if (!container) return;

      const pageHeight = 1056; // A4 height in pixels at 96 DPI
      const containerRect = container.getBoundingClientRect();
      const totalPages = Math.ceil(containerRect.height / pageHeight);
      
      const newPageBreaks = [];
      for (let i = 1; i < totalPages; i++) {
        const breakPosition = i * pageHeight;
        const breakElement = document.createElement('div');
        breakElement.className = 'page-break';
        breakElement.style.cssText = `
          position: absolute;
          left: 0;
          right: 0;
          top: ${breakPosition}px;
          height: 1px;
          background: #ddd;
          pointer-events: none;
          z-index: 1000;
        `;
        container.appendChild(breakElement);
        newPageBreaks.push(breakPosition);
      }

      // 添加页码
      const pageNumbers = document.createElement('style');
      pageNumbers.textContent = `
        .container {
          position: relative;
          counter-reset: page;
        }
        .page-break::after {
          counter-increment: page;
          content: '第' counter(page) '页';
          position: absolute;
          bottom: -20px;
          right: 20px;
          font-size: 12px;
          color: #666;
          background: white;
          padding: 2px 8px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `;
      doc.head.appendChild(pageNumbers);

      setPageBreaks(newPageBreaks);
    };

    const observer = new ResizeObserver(() => {
      // 清除旧的分页线
      const iframe = iframeRef.current;
      if (!iframe?.contentDocument) return;
      
      const oldBreaks = iframe.contentDocument.querySelectorAll('.page-break');
      oldBreaks.forEach(el => el.remove());
      
      calculatePageBreaks();
    });

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', () => {
        const container = iframe.contentDocument.querySelector('.container');
        if (container) {
          observer.observe(container);
          calculatePageBreaks();
        }
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [iframeRef]);

  return pageBreaks;
}