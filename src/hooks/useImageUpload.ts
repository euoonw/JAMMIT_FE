import { useUploadProfileImageMutation } from '@/hooks/queries/user/useUploadProfileImageMutaion';
import { useErrorModalStore } from '@/stores/useErrorModalStore';

export const useImageUpload = () => {
  const { mutateAsync: uploadImage } = useUploadProfileImageMutation();
  const { open } = useErrorModalStore();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleImageUpload = async (userId: number, file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      open('파일 크기는 최대 5MB까지 업로드 가능합니다.');
      return null;
    }
    const uploadedUrl = await uploadImage({ userId, file });
    return uploadedUrl;
  };

  return { handleImageUpload };
};
