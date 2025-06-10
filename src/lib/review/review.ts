import { PostReviewRequest } from '@/types/review';
import { apiClient } from '@/utils/apiClient';

export const postReview = async (
  reviewData: PostReviewRequest,
): Promise<void> => {
  await apiClient.post('/review', reviewData);
};
