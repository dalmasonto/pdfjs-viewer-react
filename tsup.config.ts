// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    entry: 'src/lib/index.ts',
    compilerOptions: {
      jsx: 'react-jsx',
      types: ['node'],
    },
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  target: 'esnext',
  tsconfig: './tsconfig.build.json', // Or './tsconfig.json'
  external: ['react', 'react-dom'], // Only React and ReactDOM are external
  noExternal: ['styled-components'], // Force styled-components to be bundled
  esbuildOptions(options) {
    // Ensure proper bundling of styled-components
    options.platform = 'node'; // Target browser environment for styled-components
    options.target = 'esnext';
    // Don't override the format here as tsup will set it correctly based on the output format
    // options.jsx = 'automatic';
    // options.bundle = true;
    options.format = "cjs"
  },
});