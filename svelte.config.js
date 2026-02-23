import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess()
  ],
  kit: {
    // We use adapter-static for a static site
    adapter: adapter({
      fallback: '404.html'
    }),
    prerender: {
      handleHttpError: 'warn'
    },
    alias: {
      "@/*": "./src/lib/*",
    },
  }
};

export default config;
