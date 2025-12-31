/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-cream': '#F7F5F2',
                'card-beige': '#C5A783',
                'soft-blush': '#E8CFC8',
                'accent-gold': '#D4A24F',
                'deep-brown': '#3A2E2A',
                'muted-charcoal': '#6E6A68',
            },
            fontFamily: {
                serif: ['"Crimson Text"', 'Georgia', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
                handwriting: ['"Caveat"', 'cursive'],
            },
        },
    },
    plugins: [],
}
