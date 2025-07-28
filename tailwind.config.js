module.exports = {
  content: ['*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'bold': 700,
        'black': 900,
      },
      colors: {
        // Material 3 Color System
        'primary': 'var(--md-sys-color-primary)',
        'on-primary': 'var(--md-sys-color-on-primary)',
        'primary-container': 'var(--md-sys-color-primary-container)',
        'on-primary-container': 'var(--md-sys-color-on-primary-container)',

        'secondary': 'var(--md-sys-color-secondary)',
        'on-secondary': 'var(--md-sys-color-on-secondary)',
        'secondary-container': 'var(--md-sys-color-secondary-container)',
        'on-secondary-container': 'var(--md-sys-color-on-secondary-container)',

        'tertiary': 'var(--md-sys-color-tertiary)',
        'on-tertiary': 'var(--md-sys-color-on-tertiary)',
        'tertiary-container': 'var(--md-sys-color-tertiary-container)',
        'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container)',

        'surface': 'var(--md-sys-color-surface)',
        'on-surface': 'var(--md-sys-color-on-surface)',
        'surface-variant': 'var(--md-sys-color-surface-variant)',
        'on-surface-variant': 'var(--md-sys-color-on-surface-variant)',

        'background': 'var(--md-sys-color-background)',
        'on-background': 'var(--md-sys-color-on-background)',

        'outline': 'var(--md-sys-color-outline)',
        'outline-variant': 'var(--md-sys-color-outline-variant)',
      },
      borderRadius: {
        'xs': 'var(--md-sys-shape-corner-extra-small)',
        'sm': 'var(--md-sys-shape-corner-small)',
        'md': 'var(--md-sys-shape-corner-medium)',
        'lg': 'var(--md-sys-shape-corner-large)',
        'xl': 'var(--md-sys-shape-corner-extra-large)',
        'full': 'var(--md-sys-shape-corner-full)',
      },
      spacing: {
        // Material 3 Spacing System
        '0': 'var(--md-sys-spacing-0)',
        '1': 'var(--md-sys-spacing-1)',
        '2': 'var(--md-sys-spacing-2)',
        '3': 'var(--md-sys-spacing-3)',
        '4': 'var(--md-sys-spacing-4)',
        '5': 'var(--md-sys-spacing-5)',
        '6': 'var(--md-sys-spacing-6)',
        '7': 'var(--md-sys-spacing-7)',
        '8': 'var(--md-sys-spacing-8)',
        '9': 'var(--md-sys-spacing-9)',
        '10': 'var(--md-sys-spacing-10)',
        '11': 'var(--md-sys-spacing-11)',
        '12': 'var(--md-sys-spacing-12)',
        '14': 'var(--md-sys-spacing-14)',
        '16': 'var(--md-sys-spacing-16)',
        '18': 'var(--md-sys-spacing-18)',
        '20': 'var(--md-sys-spacing-20)',
        '24': 'var(--md-sys-spacing-24)',
        '32': 'var(--md-sys-spacing-32)',
        // Additional spacing values for flexibility
        '88': '22rem',
      }
    },
  },
  plugins: [],
};
