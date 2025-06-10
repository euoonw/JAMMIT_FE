import { apiClient } from '@/utils/apiClient';
import { BandSession, Genre } from '@/types/tags';
import { RecruitResponse } from '@/types/recruit';

export async function getRecruit({
  queryKey,
  pageParam,
  size,
  sort,
}: {
  queryKey: [
    string,
    {
      genres: Genre[];
      sessions: BandSession[];
      includeCanceled: boolean;
    },
  ];
  pageParam: number;
  size: number;
  sort: string;
}): Promise<RecruitResponse> {
  const [, { genres, sessions, includeCanceled }] = queryKey;
  const params = new URLSearchParams();
  genres.forEach((g) => params.append('genres', g));
  sessions.forEach((s) => params.append('sessions', s));
  params.append('includeCanceled', includeCanceled.toString());
  params.append('page', pageParam.toString());
  params.append('size', size.toString());
  params.append('sort', sort.toString());
  return await apiClient.get(`/gatherings?${params.toString()}`);
}
