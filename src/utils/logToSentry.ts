import * as Sentry from '@sentry/nextjs';

export const logToSentry = (
  error: unknown,
  context?: {
    section?: string;
    action?: string;
    extra?: Record<string, unknown>;
    level?: 'error' | 'warning' | 'info';
  },
) => {
  Sentry.captureException(error, {
    tags: {
      section: context?.section || 'general',
      action: context?.action || 'unknown',
    },
    extra: {
      ...context?.extra,
      rawError: error,
      timestamp: new Date().toISOString(),
    },
    level: context?.level || 'error',
  });
};
