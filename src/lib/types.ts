/**
 * Types for the PDF.js viewer library
 */

// PDF document type
export interface PDFDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PDFPageProxy>;
}

// PDF page type
export interface PDFPageProxy {
  getViewport: (options: { scale: number }) => PDFViewport;
  render: (renderContext: PDFRenderContext) => PDFRenderTask;
}

// Viewport type
export interface PDFViewport {
  width: number;
  height: number;
}

// Render context type
export interface PDFRenderContext {
  canvasContext: CanvasRenderingContext2D;
  viewport: PDFViewport;
}

// Render task type
export interface PDFRenderTask {
  promise: Promise<void>;
}

// PDF.js library type
export interface PDFJSLib {
  getDocument: (url: string) => { promise: Promise<PDFDocumentProxy> };
  GlobalWorkerOptions: {
    workerSrc: string;
  };
}

/**
 * API methods exposed by the PDFJSViewer component
 */
export interface PDFJSViewerAPI {
  /**
   * Get the current page number
   */
  getCurrentPage: () => number;
  
  /**
   * Go to a specific page
   * @param pageNumber The page number to navigate to
   */
  goToPage: (pageNumber: number) => void;
}

// Props for the PDFJSViewer component
export interface PDFJSViewerProps {
  /**
   * URL of the PDF to display
   */
  pdfUrl: string;
  
  /**
   * Scale factor for rendering the PDF (default: 1.5)
   */
  scale?: number;
  
  /**
   * Custom renderer for navigation controls
   * @param props Navigation control props
   * @returns React element
   */
  renderControls?: (props: PDFControlsProps) => React.ReactNode;
  
  /**
   * CSS class name for the container
   */
  className?: string;
  
  /**
   * Worker source URL (default: Mozilla CDN)
   */
  workerSrc?: string;
  
  /**
   * Callback fired when the page changes
   * @param pageNumber The new page number
   * @param totalPages The total number of pages
   */
  onPageChange?: (pageNumber: number, totalPages: number) => void;
  
  /**
   * Callback fired when the PDF document is loaded
   * @param totalPages The total number of pages in the document
   */
  onDocumentLoad?: (totalPages: number) => void;
  
  /**
   * Ref to access the viewer API methods
   * Use this to programmatically control the viewer
   */
  viewerRef?: React.RefObject<PDFJSViewerAPI>;
}

// Props for the PDF controls component
export interface PDFControlsProps {
  /**
   * Current page number
   */
  currentPage: number;
  
  /**
   * Total number of pages
   */
  totalPages: number;
  
  /**
   * Go to previous page
   */
  onPrevPage: () => void;
  
  /**
   * Go to next page
   */
  onNextPage: () => void;
  
  /**
   * Whether the previous button is disabled
   */
  isPrevDisabled: boolean;
  
  /**
   * Whether the next button is disabled
   */
  isNextDisabled: boolean;
}
