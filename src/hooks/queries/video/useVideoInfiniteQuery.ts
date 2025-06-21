import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getVideoList } from '@/lib/video/video';
import { videoKeys } from '../queryKeys';
import { GetVideoListResponse } from '@/types/video';

interface UseVideoInfiniteQueryParams {
  sort: 'latest' | 'popular';
  size?: number;
}

export const useVideoInfiniteQuery = ({
  sort,
  size = 12,
}: UseVideoInfiniteQueryParams) => {
  return useInfiniteQuery({
    queryKey: videoKeys.list({ take: size, order: sort }),
    queryFn: ({ pageParam = 1 }) =>
      getVideoList({ page: pageParam, take: size, order: sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPage } = lastPage;
      return page < totalPage ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 1,
  });
};

export const prefetchVideoInfiniteQuery = async ({
  queryClient,
  sort,
  size = 12,
}: {
  queryClient: QueryClient;
  sort: 'latest' | 'popular';
  size?: number;
}) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: videoKeys.list({ take: size, order: sort }),
    queryFn: ({ pageParam = 1 }) =>
      getVideoList({ page: pageParam, take: size, order: sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: GetVideoListResponse) => {
      const { page, totalPage } = lastPage;
      return page < totalPage ? page + 1 : undefined;
    },
  });
};
