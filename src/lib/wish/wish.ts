import { WishQueryKey, WishResponse } from '@/types/wish';

export async function getLiked({
  queryKey,
  pageParam,
}: {
  queryKey: WishQueryKey;
  pageParam: number;
}): Promise<WishResponse> {
  const [, { genres, sessions, includeCanceled }] = queryKey;
  const params = new URLSearchParams();
  genres.forEach((g) => params.append('genres', g));
  sessions.forEach((s) => params.append('sessions', s));
  params.append('includeCanceled', includeCanceled.toString());
  params.append('page', pageParam.toString());
  params.append('size', '8');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gatherings?${params.toString()}`,
  );
  if (!res.ok) throw new Error('찜한 목록 불러오기 실패');
  return res.json();
}
