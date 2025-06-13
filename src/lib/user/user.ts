import { apiClient } from '@/utils/apiClient';
import { UserResponse } from '@/types/user';

export const getUserMe = async (): Promise<UserResponse> => {
  const result = await apiClient.get<UserResponse>('/user');
  return result;
};

export const uploadProfileImage = async (
  userId: number,
  file: File,
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/profile-image`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || '프로필 이미지 업로드 실패');
  }

  return data.result as string;
};

export interface UpdateProfileImageRequest {
  orgFileName: string;
  profileImagePath: string;
}

export const updateProfileImage = async (
  profileImagedata: UpdateProfileImageRequest,
): Promise<void> => {
  await apiClient.put('/user/image', profileImagedata);
};
