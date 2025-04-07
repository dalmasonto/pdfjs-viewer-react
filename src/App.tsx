import { useState } from 'react'
import './App.css'
import { PDFJSViewer, PDFControlsProps } from './lib'
import { Button, ControlsContainer, PageInfo } from './lib/styled';

// Example of custom controls component
const CustomControls = (props: PDFControlsProps) => {
  const { currentPage, totalPages, onPrevPage, onNextPage, isPrevDisabled, isNextDisabled } = props;
  
  return (
    <ControlsContainer style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
      <Button 
        onClick={onPrevPage} 
        disabled={isPrevDisabled}
        style={{ backgroundColor: '#ff5722' }}
      >
        « Previous
      </Button>
      
      <PageInfo style={{ fontWeight: 'bold' }}>
        {currentPage} of {totalPages}
      </PageInfo>
      
      <Button 
        onClick={onNextPage} 
        disabled={isNextDisabled}
        style={{ backgroundColor: '#4caf50' }}
      >
        Next »
      </Button>
    </ControlsContainer>
  );
};

function App() {
  const [useCustomControls, setUseCustomControls] = useState(false);
  
  return (
    <div className="app-container">
      <h1>PDF.js Viewer Library Demo</h1>
      
      <div className="options">
        <label>
          <input 
            type="checkbox" 
            checked={useCustomControls} 
            onChange={() => setUseCustomControls(!useCustomControls)} 
          />
          Use custom controls
        </label>
      </div>
      
      <p>
        <a href="https://mozilla.github.io/pdf.js/examples/" target="_blank" rel="noopener noreferrer">
          Learn more about PDF.js Viewer Library
        </a>
      </p>
      
      <div className="viewer-section">
        <h2>{useCustomControls ? 'Custom Controls' : 'Default Controls'}</h2>
        <div className="viewer-container">
          <PDFJSViewer 
            pdfUrl="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
            renderControls={useCustomControls ? CustomControls : undefined}
            scale={1.7}
          />
        </div>
      </div>
    </div>
  )
}

export default App
