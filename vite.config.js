import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { tmpdir } from 'os';
import { devLogger } from '@meituan-nocode/vite-plugin-dev-logger';
import {
  devHtmlTransformer,
  prodHtmlTransformer,
} from '@meituan-nocode/vite-plugin-nocode-html-transformer';
import react from '@vitejs/plugin-react';

const isProdEnv = process.env.NODE_ENV === 'production';
const repoName = 'resumeMakerByMD';
const base = isProdEnv ? `/${repoName}/` : '/';
const outDir = 'dist';
const plugins = [react()];

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::',
    port: '8080',
    hmr: {
      overlay: false,
    },
  },
  plugins,
  base,
  build: {
    outDir,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: 'lib',
        replacement: resolve(__dirname, 'lib'),
      },
    ],
  },
});
