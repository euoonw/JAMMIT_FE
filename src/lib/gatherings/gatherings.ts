import {
  GatheringDetailResponse,
  ParticipantsResponse,
  ParticipateGatheringResponse,
} from '@/types/gathering';
import { BandSessionType } from '@/types/tags';
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

export const postParticipateGatherings = async (
  id: number,
  bandSession: BandSessionType,
  introduction: string,
): Promise<ParticipateGatheringResponse> => {
  const result = await apiClient.post<ParticipateGatheringResponse>(
    `/gatherings/${id}/participants`,
    { bandSession, introduction },
  );
  return result;
};

export const cancelParticipateGathering = async (
  gatheringId: number,
  participantId: number,
): Promise<ParticipateGatheringResponse> => {
  const result = await apiClient.put<ParticipateGatheringResponse>(
    `/gatherings/${gatheringId}/participants/${participantId}/cancel`,
  );
  return result;
};

export const rejectParticipant = async (
  gatheringId: number,
  participantId: number,
) => {
  return await apiClient.put(
    `/gatherings/${gatheringId}/participants/${participantId}/reject`,
  );
};

export const approveParticipant = async (
  gatheringId: number,
  participantId: number,
) => {
  return await apiClient.post(
    `/gatherings/${gatheringId}/participants/${participantId}/approve`,
  );
};

export const deleteGathering = async (id: number): Promise<void> => {
  await apiClient.delete(`/gatherings/${id}`);
};
