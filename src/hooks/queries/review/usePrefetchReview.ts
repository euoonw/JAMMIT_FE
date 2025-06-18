import { getReviewRead } from '@/lib/review/reviewRead';
import { getReviewWrites } from '@/lib/review/towrite';
import { RecruitResponse } from '@/types/recruit';
import { ReviewRequest } from '@/types/review';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useReviewQuery = ({ gatheringId, userId }: ReviewRequest) => {
  return useQuery({
    queryKey: ['prefetch_review', gatheringId, userId],
    queryFn: () => getReviewRead({ gatheringId, userId }),
  });
};

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
      getReviewWrites({ pageParam, size, includeCanceled }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
