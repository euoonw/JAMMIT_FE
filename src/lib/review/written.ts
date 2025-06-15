import { ReviewItem } from '@/types/review';
import { apiClient } from '@/utils/apiClient';

export const getWrittenReviews = async (): Promise<ReviewItem[]> => {
  return await apiClient.get<ReviewItem[]>('/review/written');
};
