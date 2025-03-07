import flowbitePlugin from 'flowbite/plugin'

/** @type {import('@tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
	theme: {
		extend: {
      colors: {
        // flowbite-svelte
        primary: {
          1: "#afa4c5",
          2: "#5f4a8c",
          3: "#2f2546",
        },
        secondary: {
          1: "#e7d5ce",
          2: "#01b3cb",
          3: "#68554e"
        },
        accent: {
          1: "#80d9e5",
          2: "#d0ab9d",
          3: "#005965"
        },
        background: "#eCeCeC",      
      }
    }
  },
	plugins: [flowbitePlugin]
} as Config;