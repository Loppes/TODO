export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(sky|red|blue|green|yellow|purple|pink|indigo|gray|orange)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /hover:bg-(sky|red|blue|green|yellow|purple|pink|indigo|gray|orange)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(sky|white|black)/,
    },
  ],
}