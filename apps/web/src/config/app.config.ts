// App-wide configuration driving rendering behavior

export const appConfig = {
  api: {
    baseUrl: process.env.VITE_API_URL || '/api/v1',
    timeout: 10000,
  },
  ui: {
    cardsPerRow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
    cardConfig: {
      titleMaxLength: 255,
      descriptionMaxLength: 1000,
      showTimestamps: true,
      showCardId: false,
    },
    toastDuration: 3000,
    confirmDeleteDialog: true,
  },
  features: {
    enableAnalytics: process.env.VITE_ENABLE_ANALYTICS !== 'false',
    enableSearch: true,
    enableSorting: true,
  },
  theme: {
    mode: 'light' as 'light' | 'dark',
    primaryColor: '#2563eb',
    borderRadius: 2,
  },
  pageConfig: {
    title: 'Card System',
    subtitle: 'Manage your cards effortlessly',
    emptyStateMessage: 'No cards yet. Create your first card!',
  },
} as const;

export type AppConfig = typeof appConfig;