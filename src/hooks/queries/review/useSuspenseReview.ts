import { getReview } from '@/lib/review/received';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseReview = () => {
  return useSuspenseQuery({
    queryKey: ['received-reviews'],
    queryFn: getReview,
  });
};
