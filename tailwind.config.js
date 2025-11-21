/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				primary: {
					50: '#F5F3FF',
					100: '#EDE9FE',
					500: '#8B5CF6',
					600: '#7C3AED',
					900: '#4C1D95',
					DEFAULT: '#8B5CF6',
				},
				success: {
					50: '#ECFDF5',
					100: '#D1FAE5',
					500: '#10B981',
					600: '#059669',
					900: '#064E3B',
					DEFAULT: '#10B981',
				},
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					500: '#A3A3A3',
					700: '#404040',
					900: '#171717',
				},
				error: {
					50: '#FEF2F2',
					500: '#EF4444',
				},
				warning: {
					500: '#F59E0B',
				},
				info: {
					500: '#3B82F6',
				},
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				mono: ['Fira Code', 'Courier New', 'monospace'],
			},
			fontSize: {
				hero: ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
				h1: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
				h2: ['32px', { lineHeight: '1.3', fontWeight: '600' }],
				h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
				large: ['20px', { lineHeight: '1.6' }],
				body: ['16px', { lineHeight: '1.5' }],
				small: ['14px', { lineHeight: '1.5' }],
				caption: ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
				'xp-large': ['64px', { lineHeight: '1', fontWeight: '700' }],
				'xp-medium': ['32px', { lineHeight: '1', fontWeight: '600' }],
				streak: ['40px', { lineHeight: '1', fontWeight: '700' }],
			},
			spacing: {
				2: '8px',
				3: '12px',
				4: '16px',
				6: '24px',
				8: '32px',
				12: '48px',
				16: '64px',
				24: '96px',
				32: '128px',
			},
			borderRadius: {
				sm: '8px',
				md: '12px',
				lg: '16px',
				xl: '24px',
				full: '9999px',
			},
			boxShadow: {
				sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
				card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				modal: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
				'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
				'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
			},
			transitionDuration: {
				fast: '200ms',
				normal: '250ms',
				medium: '300ms',
				celebration: '600ms',
			},
			keyframes: {
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-10px)' },
					'75%': { transform: 'translateX(10px)' },
				},
				'bounce-scale': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
			},
			animation: {
				'shake': 'shake 200ms cubic-bezier(0.36, 0.07, 0.19, 0.97) 2',
				'bounce-scale': 'bounce-scale 400ms ease-out',
				'glow-pulse': 'glow-pulse 400ms ease-in-out 3',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
