import { apiClient } from '@/utils/apiClient';
import { BandSession, Genre } from '@/types/tags';
import { WishResponse } from '@/types/wish';

export async function getLiked({
  queryKey,
  pageParam,
  size,
}: {
  queryKey: [
    string,
    { genres: Genre[]; sessions: BandSession[]; includeCanceled: boolean },
  ];
  pageParam: number;
  size: number;
}): Promise<WishResponse> {
  const [, { genres, sessions, includeCanceled }] = queryKey;
  const params = new URLSearchParams();
  genres.forEach((g) => params.append('genres', g));
  sessions.forEach((s) => params.append('sessions', s));
  params.append('includeCanceled', includeCanceled.toString());
  params.append('page', pageParam.toString());
  params.append('size', size.toString());
  return await apiClient.get(`/gatherings?${params.toString()}`);
}
