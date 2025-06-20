import { getGatheringParticipants } from '@/lib/gatherings/gatherings';
import { ParticipantsResponse } from '@/types/gathering';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { gatheringKeys } from '../queryKeys';

export const useGatheringParticipantsQuery = (
  id: number,
  options?: Partial<UseQueryOptions<ParticipantsResponse>>,
) => {
  return useQuery({
    queryKey: gatheringKeys.details(id).participants,
    queryFn: () => getGatheringParticipants(id),
    enabled: !!id,
    ...options,
  });
};
