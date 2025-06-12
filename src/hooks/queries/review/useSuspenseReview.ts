import { getReview } from '@/lib/review/received';
import { ReviewResponse } from '@/types/review';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface ReviewProps {
  size: number;
}

export const useReviewInfiniteQuery = ({ size }: ReviewProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['received-reviews'],
    queryFn: ({ queryKey, pageParam = 0 }) =>
      getReview({ queryKey, pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ReviewResponse) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
