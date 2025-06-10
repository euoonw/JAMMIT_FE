import { getGatheringParticipants } from '@/lib/gatherings/gatherings';
import { ParticipantsResponse } from '@/types/gathering';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGatheringParticipantsQuery = (
  id: number,
  options?: Partial<UseQueryOptions<ParticipantsResponse>>,
) => {
  return useQuery({
    queryKey: ['gatheringParticipants', id],
    queryFn: () => getGatheringParticipants(id),
    enabled: !!id,
    ...options,
  });
};
