
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'hp-pink': '#ff4d8d',
                'hp-pink-dark': '#d4336e',
                'hp-blue': '#4da6ff',
                'hp-blue-dark': '#3385d4',
                'hp-orange': '#ffaa00',
                'hp-gold': '#ffd700',
                'hp-dark': '#2d1b2e',
                'hp-panel': '#ffffff',
                'hp-bg': '#fceed6',
            },
            fontFamily: {
                // Ensure there is no stray comma after 'sans-serif' inside the [ ]
                sans: ['Quicksand', 'sans-serif'],
            },
            backgroundImage: {
                'tropical-gradient': 'linear-gradient(135deg, #ff4d8d 0%, #ffaa00 100%)',
                'glossy-overlay': 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            },
            boxShadow: {
                'hp-card': '0 4px 0px 0px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.1)',
                'hp-button': '0 4px 0px 0px rgba(0,0,0,0.2)',
                'hp-button-active': '0 0px 0px 0px rgba(0,0,0,0.2)',
            }
        },
    },
    plugins: [],
}