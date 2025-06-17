import { RecruitResponse } from '@/types/recruit';
import { BandSession, Genre } from '@/types/tags';
import { apiClient } from '@/utils/apiClient';

interface GetRecruitRequest {
  size: number;
  sort: string;
  genres: Genre[];
  sessions: BandSession[];
  pageParam: number;
}

export async function getRecruit({
  pageParam,
  size,
  sort,
  genres,
  sessions,
}: GetRecruitRequest): Promise<RecruitResponse> {
  const params = new URLSearchParams();
  genres.forEach((genre) => params.append('genres', genre));
  sessions.forEach((session) => params.append('sessions', session));
  params.append('page', pageParam.toString());
  params.append('size', size.toString());
  params.append('sort', sort.toString());
  return await apiClient.get(`/gatherings?${params.toString()}`);
}
