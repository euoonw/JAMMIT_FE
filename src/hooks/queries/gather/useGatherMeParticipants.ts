import { getUserParticipantsGatherings } from '@/lib/gathering/participants';
import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';

export const useGatherMeParticipants = (
  { page, size, includeCanceled = false }: GetUserGatheringsParams = {
    page: 0,
    size: 8,
    includeCanceled: true,
  },
) =>
  useQuery({
    queryKey: ['me', 'participants', page, size, includeCanceled],
    queryFn: () =>
      getUserParticipantsGatherings({ page, size, includeCanceled }),
    retry: true,
  });
