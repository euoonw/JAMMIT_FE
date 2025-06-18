import { getReview } from '@/lib/review/received';
import { ReviewResponse } from '@/types/review';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ReviewProps {
  size: number;
  id: number;
}

export const useReviewInfiniteQuery = ({ size, id }: ReviewProps) => {
  return useInfiniteQuery({
    queryKey: ['received-reviews', id],
    queryFn: ({ pageParam = 0 }) => getReview({ pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ReviewResponse) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
