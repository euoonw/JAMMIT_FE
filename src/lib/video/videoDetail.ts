import {
  CommentPromise,
  CommentResponse,
  LikeResponse,
  LikeStatus,
  VideoDetailResponse,
  ViewResponse,
} from '@/types/video';
import { nestApiClient } from '@/utils/apiClient';

export const getVideoDetail = async ({ videoId }: { videoId: string }) => {
  return nestApiClient.get<VideoDetailResponse>(`/video/${videoId}`);
};

export const getLikeStatus = async ({ videoId }: { videoId: string }) => {
  return nestApiClient.get<LikeStatus>(`/video/like-status/${videoId}`);
};

export const postLike = async ({ videoId }: { videoId: string }) => {
  return nestApiClient.post<LikeResponse>(`/video/like/${videoId}`);
};

export const postView = async ({ videoId }: { videoId: string }) => {
  return nestApiClient.post<ViewResponse>(`/video/${videoId}`);
};

export const postComment = async ({
  videoId,
  content,
}: {
  videoId: string;
  content: string;
}) => {
  return nestApiClient.post<CommentPromise>(`/comment`, { videoId, content });
};

export const getComment = async ({
  pageParam,
  take,
  videoId,
}: {
  pageParam: number;
  take: number;
  videoId: string;
}): Promise<CommentResponse> => {
  return nestApiClient.get<CommentResponse>(
    `/comment?videoId=${videoId}&page=${pageParam}&take=${take}`,
  );
};
