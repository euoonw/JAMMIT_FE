import { uploadVideo } from '@/lib/video/videoUpload';
import { handleAuthApiError } from '@/utils/authApiError';
import { logToSentry } from '@/utils/logToSentry';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { videoKeys } from '../queryKeys';

export const useVideoUploadMutation = (
  setProgress: (progress: number) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      videoFile: File;
      accessToken: string;
    }) => uploadVideo({ ...payload, onProgress: setProgress }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...videoKeys.all, 'list'],
        exact: true,
      });
    },
    onError: (error, variables) => {
      logToSentry(error, {
        section: 'video',
        action: 'upload',
        extra: {
          fileName: variables.videoFile.name,
          title: variables.title,
          description: variables.description,
        },
      });
      handleAuthApiError(error, '업로드 중 문제가 발생했습니다.');
    },
  });
};
