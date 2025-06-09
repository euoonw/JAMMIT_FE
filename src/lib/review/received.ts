import { ReviewItem, ReviewStatusPros } from '@/types/review';
import { apiClient } from '@/utils/apiClient';

export const getStatus = async () => {
  return await apiClient.get<ReviewStatusPros>('/review/received/statistics');
};

export const getReview = async () => {
  return await apiClient.get<ReviewItem[]>('/review/received');
};
