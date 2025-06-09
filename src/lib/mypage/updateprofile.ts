import { UpdateProfileRequest, UpdateProfileResponse } from '@/types/user';
import { apiClient } from '@/utils/apiClient';

export async function putUpdateProfile({
  email,
  username,
  password,
  preferredGenres,
  preferredBandSessions,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const data = await apiClient.put<UpdateProfileResponse>('/user', {
    email,
    username,
    password,
    preferredGenres,
    preferredBandSessions,
  });
  return data;
}
