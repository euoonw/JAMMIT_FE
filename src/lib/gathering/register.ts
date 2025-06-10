import {
  RegisterGatheringsRequest,
  RegisterGatheringsResponse,
} from '@/types/gather';
import { apiClient } from '@/utils/apiClient';

export async function postRegisterGatherings({
  name,
  thumbnail,
  place,
  description,
  gatheringDateTime,
  recruitDateTime,
  genres,
  status,
  totalRecruitCount,
  gatheringSessions,
}: RegisterGatheringsRequest): Promise<RegisterGatheringsResponse> {
  const result = await apiClient.post<RegisterGatheringsResponse>(
    '/gatherings',
    {
      name,
      thumbnail,
      place,
      description,
      gatheringDateTime,
      recruitDateTime,
      genres,
      status,
      totalRecruitCount,
      gatheringSessions,
    },
  );

  return result;
}
