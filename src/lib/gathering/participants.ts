import { apiClient } from '@/utils/apiClient';
import { GatheringsResponse, GetUserGatheringsParams } from '@/types/gather';

export const getUserParticipantsGatherings = async ({
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
    `/gatherings/{gatheringId}/participants/my?${query}`,
  );
  console.log('이건 participants', result);
  return result;
};
