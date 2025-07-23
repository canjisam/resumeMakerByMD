import { useState, useEffect, useRef } from 'react';

export function usePageCount(htmlContent) {
  const [pageCount, setPageCount] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!htmlContent) return;

    setIsCalculating(true);
    
    // 创建隐藏的iframe来计算页数
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '210mm'; // A4宽度
    iframe.style.height = '297mm'; // A4高度
    iframe.style.border = 'none';
    
    document.body.appendChild(iframe);
    
    iframe.onload = () => {
      const doc = iframe.contentDocument;
      doc.open();
      doc.write(htmlContent);
      doc.close();
      
      // 等待内容渲染完成
      setTimeout(() => {
        const body = doc.body;
        const pageHeight = 297 * 3.78; // mm to px (1mm = 3.78px)
        const contentHeight = body.scrollHeight;
        const pages = Math.ceil(contentHeight / pageHeight);
        
        setPageCount(Math.max(1, pages));
        setIsCalculating(false);
        document.body.removeChild(iframe);
      }, 100);
    };
    
    iframe.srcdoc = htmlContent;
    
    return () => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    };
  }, [htmlContent]);

  return { pageCount, isCalculating };
}
