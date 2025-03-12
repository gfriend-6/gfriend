import flowbitePlugin from 'flowbite/plugin'

/** @type {import('@tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
      colors: {
        // flowbite-svelte
        primary: {
          1: "#dfdae8",
          2: "#9f92ba",
          3: "#5f4a8c",
          4: "#392c54",
          5: "#130e1c"
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
        background: "#eCeCeC",      
      }
    }
  },
	plugins: [flowbitePlugin]
} as Config;