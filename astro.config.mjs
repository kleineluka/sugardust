import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  srcDir: './src-frontend',
  build: {
      format: 'file'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});