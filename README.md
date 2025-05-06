# PDF.js Viewer React

[![npm version](https://img.shields.io/npm/v/pdfjs-react-viewer.svg)](https://www.npmjs.com/package/pdfjs-react-viewer)
[![npm downloads](https://img.shields.io/npm/dm/pdfjs-react-viewer.svg)](https://www.npmjs.com/package/pdfjs-react-viewer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable PDF viewer component for React applications. Built on top of Mozilla's PDF.js, this library makes it easy to integrate PDF viewing capabilities into your React projects.

## ✨ Features

- 📄 Render PDFs directly in your React application
- 🔍 Customizable zoom/scale options
- 📱 Responsive design
- 🎨 Customizable navigation controls
- 🚀 Compatible with React 18+ and Vite projects
- 📦 Lightweight with minimal dependencies

## 🔥 Live Demo

Check out our [live demo](https://dalmasonto.github.io/pdfjs-viewer-react/) to see the component in action!

## 📦 Installation

```bash
npm install pdfjs-react-viewer
# or
yarn add pdfjs-react-viewer
```

## 🔧 Compatibility

This library has been tested and works well with:

- ✅ React 18+
- ✅ Vite 4.x and 6.x projects
- ✅ Next.js 13+
- ✅ Create React App
- ✅ TypeScript projects

## 🤔 Why Use This Library?

- **Simplified Integration**: No need to deal with the complexities of PDF.js directly
- **React-First Design**: Built specifically for React applications
- **Lightweight**: Minimal impact on your bundle size
- **TypeScript Support**: Full TypeScript definitions included
- **Customizable**: Easily style and extend to match your application's design
- **Actively Maintained**: Regular updates and improvements

## 💻 Basic Usage

```jsx
import { PDFJSViewer } from 'pdfjs-react-viewer';

function App() {
  return (
    <div className="app">
      <PDFJSViewer 
        pdfUrl="https://example.com/sample.pdf" 
        scale={1.5}
      />
    </div>
  );
}
```

### With Custom Scale Control

```jsx
import { useState } from 'react';
import { PDFJSViewer } from 'pdfjs-react-viewer';

function App() {
  const [scale, setScale] = useState(1.5);
  
  return (
    <div className="app">
      <div className="scale-controls">
        <button onClick={() => setScale(prev => Math.max(0.5, prev - 0.25))}>Zoom Out</button>
        <span>{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale(prev => prev + 0.25)}>Zoom In</button>
      </div>
      
      <PDFJSViewer 
        pdfUrl="https://example.com/sample.pdf" 
        scale={scale}
      />
    </div>
  );
}
```

## 🚀 Getting Started with Vite

Quickly set up a new Vite project with PDF.js Viewer React:

```bash
# Create a new Vite project
npm create vite@latest my-pdf-app --template react-ts
cd my-pdf-app

# Install dependencies
npm install
npm install pdfjs-react-viewer

# Start the development server
npm run dev
```

Then edit your `src/App.tsx` to include the PDF viewer:

```tsx
import { PDFJSViewer } from 'pdfjs-react-viewer';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>PDF Viewer Example</h1>
      <div className="pdf-container">
        <PDFJSViewer 
          pdfUrl="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
          scale={1.5}
        />
      </div>
    </div>
  );
}

export default App;
```

## 📚 API Reference

### PDFJSViewer

The main component for rendering PDFs.

```jsx
import { PDFJSViewer } from 'pdfjs-react-viewer';
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pdfUrl` | `string` | Required | URL of the PDF to display |
| `scale` | `number` | `1.5` | Scale factor for rendering the PDF |
| `renderControls` | `function` | Default controls | Custom renderer for navigation controls |
| `className` | `string` | `''` | CSS class name for the container |
| `workerSrc` | `string` | Mozilla CDN | Worker source URL |
| `onPageChange` | `function` | - | Callback fired when the page changes |
| `onDocumentLoad` | `function` | - | Callback fired when the PDF document is loaded |
| `viewerRef` | `React.RefObject<PDFJSViewerAPI>` | - | Ref to access the viewer API methods |

### PDFControls

Navigation controls component that can be used separately or customized.

```jsx
import { PDFControls } from 'pdfjs-react-viewer';
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` | Current page number |
| `totalPages` | `number` | Total number of pages |
| `onPrevPage` | `function` | Go to previous page |
| `onNextPage` | `function` | Go to next page |
| `isPrevDisabled` | `boolean` | Whether the previous button is disabled |
| `isNextDisabled` | `boolean` | Whether the next button is disabled |

## Creating Custom Controls

You can create custom navigation controls by providing a function to the `renderControls` prop of the `PDFJSViewer` component. The function receives the same props as the `PDFControls` component.

### Example of Custom Controls

```jsx
import { PDFJSViewer, PDFControlsProps } from 'pdfjs-react-viewer';

// Custom controls component
const CustomControls = (props: PDFControlsProps) => {
  const { currentPage, totalPages, onPrevPage, onNextPage, isPrevDisabled, isNextDisabled } = props;
  
  return (
    <div className="custom-controls">
      <button 
        onClick={onPrevPage} 
        disabled={isPrevDisabled}
        className="custom-button"
      >
        Previous
      </button>
      
      <span className="page-indicator">
        Page {currentPage} of {totalPages}
      </span>
      
      <button 
        onClick={onNextPage} 
        disabled={isNextDisabled}
        className="custom-button"
      >
        Next
      </button>
    </div>
  );
};

// Using the custom controls
function App() {
  return (
    <div className="app">
      <PDFJSViewer 
        pdfUrl="https://example.com/sample.pdf" 
        scale={1.5}
        renderControls={CustomControls}
      />
    </div>
  );
}
```

## Using Callbacks and the Viewer API

### Page Change Tracking

You can track page changes using the `onPageChange` callback:

```jsx
import { PDFJSViewer } from 'pdfjs-react-viewer';

function App() {
  const handlePageChange = (pageNumber, totalPages) => {
    console.log(`Viewing page ${pageNumber} of ${totalPages}`);
    // Update UI or state based on page change
  };

  return (
    <div className="app">
      <PDFJSViewer 
        pdfUrl="https://example.com/sample.pdf" 
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

### Document Load Events

You can respond to document loading using the `onDocumentLoad` callback:

```jsx
import { PDFJSViewer } from 'pdfjs-react-viewer';

function App() {
  const handleDocumentLoad = (totalPages) => {
    console.log(`PDF loaded with ${totalPages} pages`);
    // Initialize UI or state based on document load
  };

  return (
    <div className="app">
      <PDFJSViewer 
        pdfUrl="https://example.com/sample.pdf" 
        onDocumentLoad={handleDocumentLoad}
      />
    </div>
  );
}
```

### Programmatic Control with Viewer API

You can programmatically control the viewer using the `viewerRef`:

```jsx
import { useRef } from 'react';
import { PDFJSViewer, PDFJSViewerAPI } from 'pdfjs-react-viewer';

function App() {
  // Create a ref to access the viewer API
  const pdfViewerRef = useRef<PDFJSViewerAPI>(null);

  // Function to jump to a specific page
  const goToPage5 = () => {
    if (pdfViewerRef.current) {
      pdfViewerRef.current.goToPage(5);
    }
  };

  // Function to get the current page
  const logCurrentPage = () => {
    if (pdfViewerRef.current) {
      const currentPage = pdfViewerRef.current.getCurrentPage();
      console.log(`Currently on page ${currentPage}`);
    }
  };

  return (
    <div className="app">
      <div className="controls">
        <button onClick={goToPage5}>Go to Page 5</button>
        <button onClick={logCurrentPage}>Log Current Page</button>
      </div>
      
      <PDFJSViewer 
        pdfUrl="https://example.com/sample.pdf" 
        viewerRef={pdfViewerRef}
      />
    </div>
  );
}
```

## Types

The library exports TypeScript types for all components and PDF.js interfaces:

```typescript
import type { 
  PDFJSViewerProps, 
  PDFControlsProps,
  PDFDocumentProxy,
  PDFPageProxy,
  PDFViewport,
  PDFRenderContext,
  PDFRenderTask,
  PDFJSLib,
  PDFJSViewerAPI // New API interface
} from 'pdfjs-react-viewer';
```

## Development

### Building the package

```bash
yarn build:package
```

### Building the demo

```bash
yarn build:demo
```

### Packing the package for installation

```bash
yarn pack
```

## License

MIT