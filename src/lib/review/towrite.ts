import { RecruitResponse } from '@/types/recruit';
import { apiClient } from '@/utils/apiClient';

export async function getReviewWrite({
  queryKey,
  pageParam,
  size,
}: {
  queryKey: [string, { includeCanceled: boolean }];
  pageParam: number;
  size: number;
}): Promise<RecruitResponse> {
  const [, { includeCanceled }] = queryKey;
  const params = new URLSearchParams();
  params.append('includeCanceled', includeCanceled.toString());
  params.append('page', pageParam.toString());
  params.append('size', size.toString());
  return await apiClient.get(
    `/gatherings/{gatheringId}/participants/my?${params.toString()}`,
  );
}
