import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function usePrefetchedCount<T>({
  queryKey,
  queryFn,
  selector,
  enabled = true,
}: {
  queryKey: readonly unknown[];
  queryFn: () => Promise<T>;
  selector: (data: T) => number;
  enabled?: boolean;
}) {
  const [count, setCount] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;
    queryClient.prefetchQuery({ queryKey, queryFn }).then(() => {
      const data = queryClient.getQueryData<T>(queryKey);
      if (data) {
        setCount(selector(data));
      }
    });
  }, [queryClient, queryKey, queryFn, selector, enabled]);

  return count;
}
