import adapter from '@sveltejs/adapter-cloudflare-workers';
export default {
	kit: {
		adapter: adapter({
			// see below for options that can be set here
		})
	}
};
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: undefined
		}),
		paths: {
			base: process.env.NODE_ENV === "production" ? "" : ""
		}
	},
  preprocess: vitePreprocess()
};

export default config;
