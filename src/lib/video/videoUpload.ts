import { CreateVideoRequest } from '@/types/video';
import { nestApiClient } from '@/utils/apiClient';

export const uploadVideo = async ({
  videoFile,
  title,
  description,
  accessToken,
  onProgress,
}: CreateVideoRequest) => {
  // 1. 업로드용 URL 발급
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_NEST}/video/uploadUrl`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const { uploadUrl, uploadId } = await res.json();
  if (!uploadUrl || !uploadId) throw new Error('업로드 URL 발급 실패');
  // 2. Mux로 직접 업로드
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', videoFile.type);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status < 400) resolve();
      else reject(new Error('Mux 업로드 실패'));
    };

    xhr.onerror = () => reject(new Error('Mux 업로드 중 네트워크 오류'));

    xhr.send(videoFile);
  });
  // const uploadRes = await fetch(uploadUrl, {
  //     method: 'PUT',
  //     headers: {
  //     'Content-Type': videoFile.type,
  //     },
  //     body: videoFile,
  // });
  // if (!uploadRes.ok) throw new Error('Mux 업로드 실패');
  // STEP 3. 백엔드에 업로드 정보 등록
  return nestApiClient.post(`/video/register`, {
    title,
    description,
    uploadId,
  });
};
