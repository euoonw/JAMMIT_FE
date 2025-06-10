import { RecruitResponse } from '@/types/recruit';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';

interface CommonQueryParams<T> {
  key: string;
  variables: T;
  size: number;
  includeCanceled: boolean;
  sort: string;
  fetchFn: (args: {
    queryKey: [string, T & { includeCanceled: boolean }];
    pageParam: number;
    size: number;
    sort: string;
  }) => Promise<RecruitResponse>;
}

export const useCommonInfiniteQuery = <T>({
  key,
  variables,
  size,
  includeCanceled,
  fetchFn,
  sort,
}: CommonQueryParams<T>) => {
  return useInfiniteQuery({
    queryKey: [key, { ...variables, includeCanceled }] as [
      string,
      T & { includeCanceled: boolean },
    ],
    queryFn: ({ queryKey, pageParam = 0 }) =>
      fetchFn({ queryKey, pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
export const prefetchCommonInfiniteQuery = async <T>({
  queryClient,
  key,
  variables,
  size,
  includeCanceled,
  fetchFn,
  sort,
}: CommonQueryParams<T> & { queryClient: QueryClient }) => {
  return await queryClient.prefetchInfiniteQuery({
    queryKey: [key, { ...variables, includeCanceled }] as [
      string,
      T & { includeCanceled: boolean },
    ],
    queryFn: ({ queryKey, pageParam = 0 }) =>
      fetchFn({ queryKey, pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
  });
};
