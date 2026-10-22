import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Development needs Vite's inline refresh preamble and style injection.
// Apply the restrictive policy to production HTML only.
const contentSecurityPolicy = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "connect-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'none'",
].join('; ');

export default defineConfig(({ command }) => ({
  base: '/168works/',
  // The build script copies only the reviewed images; public is available in dev.
  publicDir: command === 'build' ? false : 'public',
  build: { sourcemap: false },
  plugins: [
    react(),
    {
      name: 'production-content-security-policy',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler: () => [{
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: contentSecurityPolicy },
          injectTo: 'head-prepend',
        }],
      },
    },
  ],
}));
