import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserVideoList } from '@/lib/video/video';

import { userKeys } from '../queryKeys';
import { GetUserVideoListResponse } from '@/types/video';

interface UseUserVideoInfiniteQueryParams {
  userId?: number;
  sort: 'latest' | 'popular';
  size?: number;
}

export const useUserVideoInfiniteQuery = ({
  userId,
  sort,
  size = 10,
}: UseUserVideoInfiniteQueryParams) => {
  return useInfiniteQuery({
    queryKey: userKeys.videos(userId).list,
    queryFn: ({ pageParam = 1 }) =>
      getUserVideoList({ userId, page: pageParam, take: size, order: sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: GetUserVideoListResponse) => {
      const { page, totalPage } = lastPage;
      return page < totalPage ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 1,
  });
};
