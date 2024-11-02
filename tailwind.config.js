/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	prefix: "",
	theme: {
	  container: {
			  center: true,	
			  padding: '10px'
	  },
	  screens: {
		  sm: "640px",
		  md: "768px",
		  lg: "960px",
		  xl: "1200px",
	  },
	  fontFamily:{
		primary: "var(--font-roboto)",
		title: "['Source Sans Pro', sans-serif]",
	  },
	  extend: {
  
		colors: {
		  primary: 'white',
		  accent: {
			DEFAULT: '#FBAC23',
			hover: '#FBAC23',
		  },
		  accent2: {
			DEFAULT: '#69AC5A',
			hover: '#69AC5A',
		  }
		},
  
		
	  },
	},
	plugins: [],
  }