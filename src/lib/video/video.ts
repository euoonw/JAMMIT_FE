import {
  GetUserVideoCountResponse,
  GetUserVideoListResponse,
  GetVideoListResponse,
} from '@/types/video';
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

export interface GetUserVideoListParams {
  userId?: number;
  order?: 'latest' | 'popular';
  take?: number;
  page?: number;
}

export const getUserVideoList = async ({
  userId,
  order = 'latest',
  take = 10,
  page = 1,
}: GetUserVideoListParams): Promise<GetUserVideoListResponse> => {
  const query = new URLSearchParams({
    ...(userId !== undefined && { userId: userId.toString() }),
    order,
    take: take.toString(),
    page: page.toString(),
  }).toString();

  const result = await nestApiClient.get<GetUserVideoListResponse>(
    `/video/user?${query}`,
  );

  return result;
};

export interface GetUserVideoCountParams {
  userId?: number;
}

export const GetUserVideoCount = async ({
  userId,
}: GetUserVideoCountParams): Promise<GetUserVideoCountResponse> => {
  const queryParams = new URLSearchParams();

  if (userId !== undefined) {
    queryParams.append('userId', userId.toString());
  }

  const result = await nestApiClient.get<GetUserVideoCountResponse>(
    `/video/user/count?${queryParams.toString()}`,
  );

  return result;
};
