import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function usePrefetchedCount<T>({
  queryKey,
  queryFn,
  selector,
}: {
  queryKey: readonly unknown[];
  queryFn: () => Promise<T>;
  selector: (data: T) => number;
}) {
  const [count, setCount] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({ queryKey, queryFn }).then(() => {
      const data = queryClient.getQueryData<T>(queryKey);
      if (data) {
        setCount(selector(data));
      }
    });
  }, [queryClient, queryKey, queryFn, selector]);

  return count;
}
