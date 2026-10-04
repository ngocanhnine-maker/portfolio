import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// GitHub Pages serves the site under /<repo>/. Set BASE_PATH=/portfolio/ for that build;
// local dev and other hosts keep '/'.
const base = process.env.BASE_PATH || '/';

// Source code refers to files in /public with root-absolute paths ("/landing/x.jpg").
// Under a sub-path those must be prefixed with the base. CSS url(...) is left alone:
// Vite already rewrites those, and Tailwind class names must stay unchanged.
const PUBLIC_DIRS = 'landing|textures|profile|projects|gallery|certificates|papers|documents';
const prefixPublicPaths = (): Plugin => ({
  name: 'prefix-public-paths',
  enforce: 'post',
  transform(code, id) {
    if (base === '/' || id.includes('node_modules') || !/\.(tsx?|jsx?)$/.test(id)) return null;
    const re = new RegExp(`(?<!url\\()(['"\`])/(${PUBLIC_DIRS})/`, 'g');
    return re.test(code) ? {code: code.replace(re, `$1${base}$2/`), map: null} : null;
  },
});

export default defineConfig(() => {
  return {
    base,
    plugins: [react(), tailwindcss(), prefixPublicPaths()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
