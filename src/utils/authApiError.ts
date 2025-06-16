import { useToastStore } from '@/stores/useToastStore';
import * as Sentry from '@sentry/nextjs';

export const handleAuthApiError = (
  error: unknown,
  fallbackMessage: string,
  context?: {
    section?: string;
    action?: string;
    extra?: Record<string, unknown>;
  },
) => {
  Sentry.captureException(error, {
    tags: {
      section: context?.section || 'auth',
      action: context?.action || 'unknown',
    },
    extra: {
      fallbackMessage,
      ...context?.extra,
      rawError: error,
      timestamp: new Date().toISOString(),
    },
  });
  if (error instanceof Error) {
    useToastStore.getState().show(error.message);
  } else {
    useToastStore.getState().show(fallbackMessage);
  }
};
