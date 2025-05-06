import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { 
  PDFJSViewerProps, 
  PDFDocumentProxy,
  PDFControlsProps,
  PDFJSViewerAPI
} from './types';
import { Canvas, PDFContainer } from './styled';
import PDFControls from './PDFControls';

/**
 * PDF.js Viewer Component
 * A React component for viewing PDF documents using PDF.js
 */
const PDFJSViewer: React.FC<PDFJSViewerProps> = ({
  pdfUrl,
  scale = 1.5,
  renderControls,
  className,
  workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs',
  onPageChange,
  onDocumentLoad,
  viewerRef
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState<number | null>(null);
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);

  // Load PDF.js library
  useEffect(() => {
    const loadPDFJS = async () => {
      try {
        // Load the PDF.js script dynamically
        const script = document.createElement('script');
        script.src = 'https://mozilla.github.io/pdf.js/build/pdf.mjs';
        script.type = 'module';
        
        // Create a promise to wait for script load
        const scriptLoadPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load PDF.js library'));
        });
        
        document.body.appendChild(script);
        
        // Wait for script to load
        await scriptLoadPromise;
        
        // Access the PDF.js library
        const pdfjsLibInstance = (window as any).pdfjsLib;
        
        if (!pdfjsLibInstance) {
          console.error('PDF.js library not loaded');
          return;
        }
        
        // Set the worker source
        pdfjsLibInstance.GlobalWorkerOptions.workerSrc = workerSrc;
        
        setPdfjsLib(pdfjsLibInstance);
      } catch (error) {
        console.error('Error loading PDF.js:', error);
      }
    };
    
    loadPDFJS();
    
    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://mozilla.github.io/pdf.js/build/pdf.mjs"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [workerSrc]);

  // Load PDF document when pdfjsLib is available
  useEffect(() => {
    if (!pdfjsLib || !pdfUrl) return;
    
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const doc = await loadingTask.promise;
        
        setPdfDoc(doc);
        setPageCount(doc.numPages);
        
        // Call onDocumentLoad callback if provided
        if (onDocumentLoad) {
          onDocumentLoad(doc.numPages);
        }
        
        // Render the first page
        renderPage(1, doc);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    
    loadPDF();
  }, [pdfjsLib, pdfUrl]);

  // Render a specific page
  const renderPage = async (num: number, doc: PDFDocumentProxy | null = pdfDoc) => {
    if (!doc || !canvasRef.current) return;
    
    setPageRendering(true);
    
    try {
      // Get the page
      const page = await doc.getPage(num);
      
      // Set up canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Canvas context not available');
        return;
      }
      
      // Calculate viewport
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      
      // Render the page
      const renderTask = page.render(renderContext);
      await renderTask.promise;
      
      setPageRendering(false);
      
      // Check if there's a pending page
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        setPageNumPending(null);
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      setPageRendering(false);
    }
  };

  // Queue rendering a page
  const queueRenderPage = (num: number) => {
    if (pageRendering) {
      setPageNumPending(num);
    } else {
      renderPage(num);
    }
  };

  // Go to previous page
  const onPrevPage = () => {
    if (pageNum <= 1) return;
    const newPageNum = pageNum - 1;
    setPageNum(newPageNum);
    queueRenderPage(newPageNum);
    
    // Call onPageChange callback if provided
    if (onPageChange) {
      onPageChange(newPageNum, pageCount);
    }
  };

  // Go to next page
  const onNextPage = () => {
    if (pageNum >= pageCount) return;
    const newPageNum = pageNum + 1;
    setPageNum(newPageNum);
    queueRenderPage(newPageNum);
    
    // Call onPageChange callback if provided
    if (onPageChange) {
      onPageChange(newPageNum, pageCount);
    }
  };
  
  // Go to a specific page
  const goToPage = (num: number) => {
    if (num < 1 || num > pageCount) return;
    setPageNum(num);
    queueRenderPage(num);
    
    // Call onPageChange callback if provided
    if (onPageChange) {
      onPageChange(num, pageCount);
    }
  };
  
  // Get current page
  const getCurrentPage = () => pageNum;

  // Expose API methods via ref
  useImperativeHandle(viewerRef, (): PDFJSViewerAPI => ({
    getCurrentPage,
    goToPage
  }), [pageNum, pageCount]);
  
  // Controls props
  const controlsProps: PDFControlsProps = {
    currentPage: pageNum,
    totalPages: pageCount,
    onPrevPage,
    onNextPage,
    isPrevDisabled: pageNum <= 1,
    isNextDisabled: pageNum >= pageCount
  };

  return (
    <PDFContainer className={className}>
      {/* Render custom controls or default controls */}
      {renderControls ? renderControls(controlsProps) : <PDFControls {...controlsProps} />}
      
      {/* PDF Canvas */}
      <Canvas ref={canvasRef} />
    </PDFContainer>
  );
};

export default PDFJSViewer;
