import { getGatheringDetail } from '@/lib/gatherings/gatherings';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GatheringDetailResponse } from '@/types/gathering';

export const useGatheringDetailQuery = (
  id: number,
  options?: Partial<UseQueryOptions<GatheringDetailResponse>>,
) => {
  return useQuery<GatheringDetailResponse>({
    queryKey: ['gatheringDetail', id],
    queryFn: () => getGatheringDetail(id),
    enabled: !!id,
    ...options,
  });
};
