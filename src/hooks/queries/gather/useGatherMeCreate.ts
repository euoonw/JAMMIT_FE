import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';
import { getUserCreatedGatherings } from '@/lib/gathering/created';

export const gatherMeCreateQuery = ({
  page,
  size,
  includeCanceled,
}: GetUserGatheringsParams) => ({
  queryKey: ['me', 'created', page, size, includeCanceled],
  queryFn: () => getUserCreatedGatherings({ page, size, includeCanceled }),
});

export const useGatherMeCreate = (
  { page, size, includeCanceled = false }: GetUserGatheringsParams = {
    page: 0,
    size: 8,
    includeCanceled: true,
  },
) =>
  useQuery({
    queryKey: ['me', 'created', page, size, includeCanceled],
    queryFn: () => getUserCreatedGatherings({ page, size, includeCanceled }),
    retry: true,
  });

export function useCreatedCount() {
  const [createdCount, setCreatedCount] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    const { queryKey, queryFn } = gatherMeCreateQuery({
      page: 0,
      size: 1,
      includeCanceled: true,
    });

    queryClient.prefetchQuery({ queryKey, queryFn }).then(() => {
      const cachedData = queryClient.getQueryData<{ totalElements: number }>(
        queryKey,
      );
      if (cachedData && typeof cachedData.totalElements === 'number') {
        setCreatedCount(cachedData.totalElements);
      }
    });
  }, [queryClient]);

  return createdCount;
}
