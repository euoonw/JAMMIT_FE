import { useQuery } from '@tanstack/react-query';
import { getUserParticipantsGatherings } from '@/lib/gathering/participants';
import { GetUserGatheringsParams } from '@/types/gather';
import { userKeys } from '../queryKeys';

export const gatherMeParticipantsQuery = ({
  page,
  size,
  includeCanceled,
}: GetUserGatheringsParams) => ({
  queryKey: userKeys.myParticipatedGatherings({
    page,
    size,
    includeCanceled,
  }) as unknown as unknown[],
  queryFn: () => getUserParticipantsGatherings({ page, size, includeCanceled }),
});

export const useGatherMeParticipants = (
  { page, size = 4, includeCanceled = false }: GetUserGatheringsParams = {
    page: 0,
    size: 4,
    includeCanceled: true,
  },
) =>
  useQuery({
    queryKey: userKeys.myParticipatedGatherings({
      page,
      size,
      includeCanceled,
    }) as unknown as unknown[],
    queryFn: () =>
      getUserParticipantsGatherings({ page, size, includeCanceled }),
    retry: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
