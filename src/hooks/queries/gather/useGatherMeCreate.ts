import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';
import { getUserCreatedGatherings } from '@/lib/gathering/created';
import { userKeys } from '../queryKeys';

export const gatherMeCreateQuery = ({
  page,
  size,
  includeCanceled,
}: GetUserGatheringsParams) => ({
  queryKey: userKeys.myCreatedGatherings({
    page,
    size,
    includeCanceled,
  }) as unknown as unknown[],
  queryFn: () => getUserCreatedGatherings({ page, size, includeCanceled }),
});

export const useGatherMeCreate = (
  { page, size, includeCanceled = false }: GetUserGatheringsParams = {
    page: 0,
    size: 4,
    includeCanceled: true,
  },
) =>
  useQuery({
    queryKey: userKeys.myCreatedGatherings({
      page,
      size,
      includeCanceled,
    }) as unknown as unknown[],
    queryFn: () => getUserCreatedGatherings({ page, size, includeCanceled }),
    retry: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
