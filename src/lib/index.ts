// Export components
// export { default as PDFJSViewer } from './PDFJSViewer';
// export { default as PDFControls } from './PDFControls';

import PDFControls from './PDFControls';
import PDFJSViewer from './PDFJSViewer';

// Export styled components
// export * from './styled';

// Export types explicitly
// export type {
//   PDFDocumentProxy,
//   PDFPageProxy,
//   PDFViewport,
//   PDFRenderContext,
//   PDFRenderTask,
//   PDFJSLib,
//   PDFJSViewerProps,
//   PDFControlsProps
// } from './types';

export * from "./types"

export { PDFControls, PDFJSViewer }