import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

interface UseSentryErrorLoggerOptions {
  isError: boolean;
  error: unknown;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  message?: string;
}

export const useSentryErrorLogger = ({
  isError,
  error,
  tags,
  extra,
  message,
}: UseSentryErrorLoggerOptions) => {
  useEffect(() => {
    if (!isError || !error) return;

    // 기본적으로 Error 객체만 처리
    if (error instanceof Error) {
      Sentry.captureException(error, {
        tags,
        extra,
      });
    } else {
      // 예상치 못한 타입이라면 메시지로 래핑
      Sentry.captureMessage(message || 'Unknown error in query', {
        tags,
        extra: { error, ...extra },
      });
    }
  }, [isError, error, extra, message, tags]);
};
