import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname, "./tsconfig.vite.json"),
      include: ['src/lib/**/*'],
      outDir: "dist/types",
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      // Entry point for your library
      entry: resolve(__dirname, "src/lib/index.ts"),
      // name: 'pdfjs-viewer',
      // fileName: (format) => `pdfjs-viewer.${format}.js`,
      formats: ["es", "cjs"],
    },
    outDir: 'dist',
    // sourcemap: true,
    // minify: 'terser',
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into your library
      external: [
        'react', 
        'react-dom', 
        // 'styled-components',
        // /^styled-components\/.*$/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          // 'styled-components': 'styled',
        },
        // Ensure that external CSS imports are preserved
        // preserveModules: false,
        // Ensure proper exports for UMD build
        // exports: 'named',
      },
    },
  },
})