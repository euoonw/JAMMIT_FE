import { GetVideoListResponse } from '@/types/video';
import { nestApiClient } from '@/utils/apiClient';

export interface GetVideoListParams {
  order?: 'latest' | 'popular';
  take?: number;
  page?: number;
}

export const getVideoList = async ({
  order = 'latest',
  take = 10,
  page = 1,
}: GetVideoListParams): Promise<GetVideoListResponse> => {
  const query = new URLSearchParams({
    order,
    take: take.toString(),
    page: page.toString(),
  }).toString();
  const result = await nestApiClient.get<GetVideoListResponse>(
    `/video?${query}`,
  );
  return result;
};
