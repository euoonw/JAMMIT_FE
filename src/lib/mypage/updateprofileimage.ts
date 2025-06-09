import { UpdateProfileImageRequest, UpdateProfileResponse } from '@/types/user';
import { apiClient } from '@/utils/apiClient';

export async function putUpdateProfileImage({
  orgFileName,
  profileImagePath,
}: UpdateProfileImageRequest): Promise<UpdateProfileResponse> {
  const data = await apiClient.put<UpdateProfileResponse>('/user/image', {
    orgFileName,
    profileImagePath,
  });

  return data;
}
