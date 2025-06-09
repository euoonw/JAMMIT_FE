import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviewWrite } from '@/lib/review/towrite';
import { Page } from '@/types/wish';

interface ReivewProps {
  size: number;
  includeCanceled: boolean;
}

export const useReviewInfiniteQuery = ({
  size,
  includeCanceled,
}: ReivewProps) => {
  return useInfiniteQuery({
    queryKey: ['getReviewWrite', { includeCanceled }] as [
      string,
      { includeCanceled: boolean },
    ],
    queryFn: ({ queryKey, pageParam = 0 }) =>
      getReviewWrite({ queryKey, pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
