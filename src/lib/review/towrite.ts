import { RecruitResponse } from '@/types/recruit';
import { apiClient } from '@/utils/apiClient';

export async function getReviewWrite({
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
