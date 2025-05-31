/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#3B82F6', // Trust-building blue - blue-500
        'primary-50': '#EFF6FF', // Light blue tint - blue-50
        'primary-100': '#DBEAFE', // Lighter blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Dark blue - blue-700

        // Secondary Colors
        'secondary': '#8B5CF6', // Creative purple - violet-500
        'secondary-50': '#F5F3FF', // Light purple tint - violet-50
        'secondary-100': '#EDE9FE', // Lighter purple - violet-100
        'secondary-500': '#8B5CF6', // Medium purple - violet-500
        'secondary-600': '#7C3AED', // Darker purple - violet-600

        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-50': '#FFFBEB', // Light amber tint - amber-50
        'accent-100': '#FEF3C7', // Lighter amber - amber-100
        'accent-500': '#F59E0B', // Medium amber - amber-500
        'accent-600': '#D97706', // Darker amber - amber-600

        // Background Colors
        'background': '#FAFAFA', // Soft off-white - gray-50
        'surface': '#FFFFFF', // Pure white - white

        // Text Colors
        'text-primary': '#1F2937', // Rich charcoal - gray-800
        'text-secondary': '#6B7280', // Balanced gray - gray-500

        // Status Colors
        'success': '#10B981', // Natural green - emerald-500
        'success-50': '#ECFDF5', // Light green tint - emerald-50
        'success-100': '#D1FAE5', // Lighter green - emerald-100
        'success-500': '#10B981', // Medium green - emerald-500

        'warning': '#F59E0B', // Consistent amber - amber-500
        'warning-50': '#FFFBEB', // Light amber tint - amber-50
        'warning-100': '#FEF3C7', // Lighter amber - amber-100
        'warning-500': '#F59E0B', // Medium amber - amber-500

        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Light red tint - red-50
        'error-100': '#FEE2E2', // Lighter red - red-100
        'error-500': '#EF4444', // Medium red - red-500

        // Border Colors
        'border': 'rgba(0, 0, 0, 0.1)', // Minimal border - black with opacity
        'border-light': 'rgba(0, 0, 0, 0.05)', // Lighter border - black with opacity
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], // Modern geometric sans-serif - Inter
        'body': ['Inter', 'sans-serif'], // Consistent with headings - Inter
        'caption': ['Inter', 'sans-serif'], // Visual consistency - Inter
        'data': ['JetBrains Mono', 'monospace'], // Monospace for technical info - JetBrains Mono
      },
      fontWeight: {
        'heading-normal': '400', // Inter normal weight
        'heading-medium': '600', // Inter medium weight
        'heading-bold': '700', // Inter bold weight
        'body-normal': '400', // Inter normal weight
        'body-medium': '500', // Inter medium weight
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'xl': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'card': '8px', // Standard for cards
        'button': '4px', // Standard for buttons
        'avatar': '12px', // Standard for avatars
      },
      spacing: {
        '18': '4.5rem', // 72px for desktop header
        '16': '4rem', // 64px for mobile header
      },
      zIndex: {
        'navigation': '100',
        'dropdown': '200',
        'modal': '300',
        'notification': '400',
      },
      animation: {
        'spring': 'spring 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'page-transition': 'page-transition 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'spring': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'page-transition': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'skeleton-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}