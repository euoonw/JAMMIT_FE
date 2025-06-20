import { getRecruit } from '@/lib/recruit/recruit';
import { RecruitResponse } from '@/types/recruit';
import { BandSession, Genre } from '@/types/tags';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { gatheringKeys } from '../queryKeys';

interface CommonQueryParams {
  size: number;
  sort: string;
  genres: Genre[];
  sessions: BandSession[];
}

export const useCommonInfiniteQuery = ({
  size,
  sort,
  genres,
  sessions,
}: CommonQueryParams) => {
  return useInfiniteQuery({
    queryKey: gatheringKeys.list({ size, sort, genres, sessions }),
    queryFn: ({ pageParam = 0 }) =>
      getRecruit({ pageParam, size, sort, genres, sessions }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 1,
  });
};

export const prefetchCommonInfiniteQuery = async ({
  queryClient,
  size,
  sort,
  genres,
  sessions,
}: CommonQueryParams & { queryClient: QueryClient }) => {
  return await queryClient.prefetchInfiniteQuery({
    queryKey: gatheringKeys.list({ size, sort, genres, sessions }),
    queryFn: ({ pageParam = 0 }) =>
      getRecruit({ pageParam, size, sort, genres, sessions }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 1,
  });
};
