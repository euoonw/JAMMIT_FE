import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getWrittenReviews } from '@/lib/review/written';
import { ReviewItem } from '@/types/review';

export const useWrittenReviewsQuery = (
  options?: Partial<UseQueryOptions<ReviewItem[]>>,
) => {
  return useQuery({
    queryKey: ['writtenReviews'],
    queryFn: getWrittenReviews,
    ...options,
  });
};
