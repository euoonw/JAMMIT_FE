import { ReviewDetailResponse, ReviewRequest } from '@/types/review';
import { apiClient } from '@/utils/apiClient';

export async function getReviewRead({
  gatheringId,
  userId,
}: ReviewRequest): Promise<ReviewDetailResponse> {
  return await apiClient.get<ReviewDetailResponse>(
    `/review/${gatheringId}/participants/${userId}/reviews`,
  );
}
