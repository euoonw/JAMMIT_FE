import { useEffect, useState } from 'react';

interface UseInitialLoadingOptions {
  delay?: number;
  enabled?: boolean;
}

export default function useInitialLoading(
  options: UseInitialLoadingOptions = {},
) {
  const { delay = 300, enabled = true } = options;
  const [isInitialLoading, setIsInitialLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setIsInitialLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, enabled]);

  return isInitialLoading;
}
