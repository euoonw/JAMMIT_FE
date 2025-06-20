import { getGatheringDetail } from '@/lib/gatherings/gatherings';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GatheringDetailResponse } from '@/types/gathering';
import { gatheringKeys } from '../queryKeys';

export const useGatheringDetailQuery = (
  id: number,
  options?: Partial<UseQueryOptions<GatheringDetailResponse>>,
) => {
  return useQuery<GatheringDetailResponse>({
    queryKey: gatheringKeys.details(id).detail,
    queryFn: () => getGatheringDetail(id),
    enabled: !!id,
    ...options,
  });
};
