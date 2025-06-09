import {
  GatheringDetailResponse,
  ParticipantsResponse,
} from '@/types/gathering';
import { apiClient } from '@/utils/apiClient';

export const getGatheringDetail = async (
  id: number,
): Promise<GatheringDetailResponse> => {
  const result = await apiClient.get<GatheringDetailResponse>(
    `/gatherings/${id}`,
  );
  return result;
};

export const getGatheringParticipants = async (
  id: number,
): Promise<ParticipantsResponse> => {
  const result = await apiClient.get<ParticipantsResponse>(
    `/gatherings/${id}/participants`,
  );
  return result;
};
