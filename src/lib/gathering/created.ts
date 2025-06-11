import { apiClient } from '@/utils/apiClient';
import { GatheringsResponse, GetUserGatheringsParams } from '@/types/gather';

export const getUserCreatedGatherings = async ({
  page,
  size,
  includeCanceled = false,
}: GetUserGatheringsParams): Promise<GatheringsResponse> => {
  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
    includeCanceled: String(includeCanceled),
  }).toString();

  const result = await apiClient.get<GatheringsResponse>(
    `/gatherings/my/created?${query}`,
  );
  return result;
};
