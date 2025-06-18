import { RecruitResponse } from '@/types/recruit';
import { ReviewWriteResponse } from '@/types/review';
import { apiClient } from '@/utils/apiClient';

export async function getReviewWrite(): Promise<ReviewWriteResponse> {
  return await apiClient.get<ReviewWriteResponse>('/review/unwritten');
}

export async function getReviewWrites({
  pageParam,
  size,
  includeCanceled,
}: {
  pageParam: number;
  size: number;
  includeCanceled: boolean;
}): Promise<RecruitResponse> {
  const params = new URLSearchParams();
  params.append('includeCanceled', includeCanceled.toString());
  params.append('page', pageParam.toString());
  params.append('size', size.toString());
  return await apiClient.get<RecruitResponse>(
    `/gatherings/{gatheringId}/participants/my?${params.toString()}`,
  );
}
