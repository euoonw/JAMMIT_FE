import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '@/lib/review/review';
import { PostReviewRequest } from '@/types/review';
import { userKeys } from '../queryKeys';

export const usePostReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReviewRequest) => postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.reviews.written() });
    },
  });
};
