import { apiClient } from '@/utils/apiClient';
import {
  ModifiedGatheringsRequest,
  ModifiedGatheringsResponse,
} from '@/types/gather';

export async function putModifiedGatherings({
  id,
  ...requestData
}: {
  id: number;
} & ModifiedGatheringsRequest): Promise<ModifiedGatheringsResponse> {
  const data = await apiClient.put<ModifiedGatheringsResponse>(
    `/gatherings/${id}`,
    requestData,
  );
  return data;
}
