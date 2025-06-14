import { getUserParticipantsGatherings } from '@/lib/gathering/participants';
import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';

export const useGatherMeParticipants = (
  { page, size = 4, includeCanceled = false }: GetUserGatheringsParams = {
    page: 0,
    size: 4,
    includeCanceled: true,
  },
) =>
  useQuery({
    queryKey: ['me', 'participants', page, size, includeCanceled],
    queryFn: () =>
      getUserParticipantsGatherings({ page, size, includeCanceled }),
    retry: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
