/** @type {import('tailwindcss').Config} */


export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js,jsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '420px',
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--primary-color)',
                    light: 'var(--primary-color-light)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary-color)',
                    light: 'var(--secondary-color-light)',
                },
                dangerAlert: 'var(--danger-alert)',
                lightColor: 'var(--light-color)',
                backgroundPrimaryColor: 'var(--background-primary-color)',
                backgroundSecondaryColor: 'var(--background-secondary-color)',
                linesColor: 'var(--lines-color)',
                titleColor: 'var(--title-color)',
                textColor: 'var(--text-color)',
                textColorLight: 'var(--text-color-light)',
                textColorButton: 'var(--text-color-button)',
                likesColor: 'var(--likes-color)',
                transparent: 'transparent',
            },
            fontSize: {
                fontSizeH1: '54px',
                fontSizeH2: '40px',
                fontSizeH3: '36px',
                fontSizeH4: '28px',
                fontSizeButton: '20px',
                fontSizeText: '18px',
                fontSizeSmall: '16px',
                fontSizeExtraSmall: '12px',
            },
            fontWeight: {
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 500,
                fontWeightBold: 700,
            },
            padding: {
                paddingPage: '10px 15px',
            },
            transitionDuration: {
                transition: '0.2s',
                themeTransition: 'background-color 0.2s linear',
            },
            opacity: {
                hoverOpacity: '0.8',
                activeOpacity: '0.5',
            },
            boxShadow: {
                hoverShadow: '0px 10px 13px var(--background-secondary-color)',
            },
        },
        fontFamily: {
            display: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
}