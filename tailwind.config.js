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
          100: '#F4DEFF',
          200: '#ecc5ff',
          300: '#e4acff',
          400: '#d16aff',
          500: '#bb44f0',
          600: '#9614d0',
          700: '#660094',
          800: '#310047',
        },
        gfriend: {
          purple: {
            400: '#7e6ea2',
            500: '#5f4b8b',
          },
          blue: {
            300: '#99dde5',
            500: '#00abc0',
          },
          gray: '#f0eee9'
        }
      }
    }
	},

	plugins: [flowbitePlugin]
} as Config;