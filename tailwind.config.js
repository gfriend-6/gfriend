import flowbitePlugin from 'flowbite/plugin'

/** @type {import('@tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
      colors: {
        // flowbite-svelte
        primary: {
          100: "#dfd9eb",
          200: "#bfb4d7",
          300: "#a08fc4",
          400: "#806ab0",
          500: "#5F4A8C",
          600: "#644e94",
          700: "#4b3a6f",
          800: "#32274a",
          900: "#191325"
        },
        secondary: {
          1: "#f5eeeb",
          2: "#e2ccc4",
          3: "#D0AB9D",
          4: "#7c665e",
          5: "#29221f"
        },
        accent: {
          1: "#cceff4",
          2: "#66d1df",
          3: "#01b3cb",
          4: "#006b79",
          5: "#002328"
        },
        background: "#eCeCeC"
      }
    }
  },
	plugins: [flowbitePlugin]
} as Config;