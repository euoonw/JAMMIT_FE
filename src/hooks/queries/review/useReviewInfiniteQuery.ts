import { getReviewWrite } from '@/lib/review/towrite';
import { RecruitResponse } from '@/types/recruit';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ReivewProps {
  size: number;
  includeCanceled: boolean;
  id: number;
}

export const useReviewToWriteInfiniteQuery = ({
  size,
  includeCanceled,
  id,
}: ReivewProps) => {
  return useInfiniteQuery({
    queryKey: ['getReviewWrite', includeCanceled, id],
    queryFn: ({ pageParam = 0 }) =>
      getReviewWrite({ pageParam, size, includeCanceled }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
