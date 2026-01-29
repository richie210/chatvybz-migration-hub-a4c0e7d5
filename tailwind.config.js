module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* transparent-black-8 / transparent-white-8 */
        input: 'var(--color-input)', /* gray-200 / gray-700 */
        ring: 'var(--color-ring)', /* teal-700 / green-500 */
        background: 'var(--color-background)', /* gray-50 / gray-950 */
        foreground: 'var(--color-foreground)', /* gray-800 / gray-200 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* teal-700 / green-500 */
          foreground: 'var(--color-primary-foreground)', /* white / black */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* green-500 / teal-700 */
          foreground: 'var(--color-secondary-foreground)', /* black / white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* sky-400 */
          foreground: 'var(--color-accent-foreground)', /* white / black */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-500 */
          foreground: 'var(--color-success-foreground)', /* white / black */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* black */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 / gray-800 */
          foreground: 'var(--color-muted-foreground)', /* gray-500 / gray-400 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white / gray-900 */
          foreground: 'var(--color-card-foreground)', /* gray-800 / gray-200 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white / gray-900 */
          foreground: 'var(--color-popover-foreground)', /* gray-800 / gray-200 */
        },
        message: {
          sent: 'var(--color-message-sent)', /* teal-700 */
          'sent-foreground': 'var(--color-message-sent-foreground)', /* white */
          received: 'var(--color-message-received)', /* white / gray-800 */
          'received-foreground': 'var(--color-message-received-foreground)', /* gray-800 / gray-200 */
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)', /* 6px */
        md: 'var(--radius-md)', /* 12px */
        lg: 'var(--radius-lg)', /* 16px */
        xl: 'var(--radius-xl)', /* 24px */
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        caption: 'var(--font-caption)',
        mono: 'var(--font-mono)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '300': '300',
        '400': '400',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      keyframes: {
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        typingPulse: {
          '0%, 60%, 100%': { opacity: '0.4' },
          '30%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        slideDown: 'slideDown 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        fadeIn: 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        typingPulse: 'typingPulse 1.2s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}