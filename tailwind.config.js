/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js,jsx}",
    ],
    theme: {
        extend: {
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
        },
        fontFamily: {
            display: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
}