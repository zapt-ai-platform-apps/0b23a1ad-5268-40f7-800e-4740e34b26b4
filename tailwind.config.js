export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
            },
            colors: {
                indigo: {
                    950: '#0E0B30'
                }
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            },
            textShadow: {
                'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
                'md': '0 2px 4px rgba(0, 0, 0, 0.3)',
                'lg': '0 4px 8px rgba(0, 0, 0, 0.4)',
            },
        },
    },
    plugins: [],
};