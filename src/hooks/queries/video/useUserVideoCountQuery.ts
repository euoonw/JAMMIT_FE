import { useQuery } from '@tanstack/react-query';
import { GetUserVideoCountResponse } from '@/types/video';
import { GetUserVideoCount, GetUserVideoCountParams } from '@/lib/video/video';
import { userKeys } from '../queryKeys';

export const useUserVideoCountQuery = (params: GetUserVideoCountParams) => {
  return useQuery<GetUserVideoCountResponse>({
    queryKey: userKeys.videos(params.userId).count,
    queryFn: () => GetUserVideoCount(params),
    enabled: params.userId !== undefined,
  });
};

export const userVideoCountQuery = (params?: GetUserVideoCountParams) => {
  const userId = params?.userId;
  return {
    queryKey: userKeys.videos(userId).count,
    queryFn: () => GetUserVideoCount({ userId }),
  };
};
