import { getReview } from '@/lib/review/received';
import { ReviewResponse } from '@/types/review';
import { useInfiniteQuery } from '@tanstack/react-query';
import { userKeys } from '../queryKeys';

interface ReviewProps {
  size: number;
  enabled?: boolean;
}

export const useReviewInfiniteQuery = ({
  size,
  enabled = true,
}: ReviewProps) => {
  return useInfiniteQuery({
    queryKey: userKeys.reviews.received(),
    queryFn: ({ pageParam = 0 }) => getReview({ pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ReviewResponse) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
