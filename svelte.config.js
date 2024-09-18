import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '/404.html'
		}),
		paths: {
			base: process.env.NODE_ENV === "production" ? "" : ""
		}
	},
  preprocess: vitePreprocess()
};

export default config;