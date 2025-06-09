import { getUserCreatedGatherings } from '@/lib/gathering/created';
import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';

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
