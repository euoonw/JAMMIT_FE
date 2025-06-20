import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getWrittenReviews } from '@/lib/review/written';
import { ReviewItem } from '@/types/review';
import { userKeys } from '../queryKeys';

export const useWrittenReviewsQuery = (
  options?: Partial<UseQueryOptions<ReviewItem[]>>,
) => {
  return useQuery({
    queryKey: userKeys.reviews.written(),
    queryFn: getWrittenReviews,
    ...options,
  });
};
