import { getGatheringDetail } from '@/lib/gatherings/gatherings';
import { useQuery } from '@tanstack/react-query';

export const useGatheringDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ['gatheringDetail', id],
    queryFn: () => getGatheringDetail(id),
    enabled: !!id,
  });
};
