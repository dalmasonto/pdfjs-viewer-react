import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Get repository name from package.json or environment
const repoName = process.env.REPO_NAME || 'pdfjs-viewer-react'

// Configuration for building the demo application
export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages deployment
  base: `/${repoName}/`,
  build: {
    outDir: 'demo-dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
