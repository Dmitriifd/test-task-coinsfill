const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/*.{js,ts}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '480px',
      lg: '480px',
    },
    extend: {
      backgroundImage: {
        modal:
          "url('../assets/img/modal-bg.png'), linear-gradient(180deg, #4936D4 0%, #6835D4 100%)",
        primaryBg: 'linear-gradient(273deg, #FFC543 4.95%, #FF8412 93.62%)',
        secondaryBg: 'linear-gradient(273deg, #686DE0 4.95%, #4834D4 93.62%)',
        lightBg: 'linear-gradient(273deg, #EDEBFB 4.95%, #F0F0FC 93.62%)',
      },
      colors: {
        yellowColor: '#FFC543',
        overlayColor: 'rgba(30, 30, 46, 0.90)',
        grayColorLight: 'rgba(30, 30, 46, 0.50)',
        bgAvatar: '#F3F5F5',
        blackColor: '#1E1E2E',
      },
      boxShadow: {
        loginBtn: '0px 4px 8px 0px rgba(67, 41, 124, 0.25)',
        regBtn: '0px 4px 20px 0px rgba(104, 109, 224, 0.50)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    fontFamily: {
      montserrat: ['__Montserrat_cce811', '__Montserrat_Fallback_cce811'],
    },
  },

  plugins: [],
};
export default config;
