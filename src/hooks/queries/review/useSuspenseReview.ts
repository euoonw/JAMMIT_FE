import { getReview } from '@/lib/review/received';
import { ReviewResponse } from '@/types/review';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ReivewProps {
  size: number;
}

export const useReviewInfiniteQuery = ({ size }: ReivewProps) => {
  return useInfiniteQuery({
    queryKey: ['received-reviews'],
    queryFn: ({ queryKey, pageParam = 0 }) =>
      getReview({ queryKey, pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ReviewResponse) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
