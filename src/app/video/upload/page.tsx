'use client';
import IcVideo from '@/assets/icons/ic_video.svg';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import Textarea from '@/components/commons/Textarea';
import { useVideoUploadMutation } from '@/hooks/queries/video/useVideoUpload';
import { usePreventScroll } from '@/hooks/usePreventScroll';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';
import Lottie from 'react-lottie-player';

export default function VideoUpload() {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  // 드래그앤 드랍
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': [] },
    // 파일은 하나만
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      generateThumbnail(videoURL);
    },
  });
  // 썸네일 추출
  const generateThumbnail = (videoURL: string) => {
    const video = document.createElement('video');
    video.src = videoURL;
    video.crossOrigin = 'anonymous';
    video.currentTime = 1;

    // 영상 업로드후 썸네일 캡쳐
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setThumbnail(imageUrl);
      }
    });
  };
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });
  const { accessToken } = useAuthStore();
  console.log(accessToken);
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
  const { mutate: submitUpload, isPending } =
    useVideoUploadMutation(setProgress);

  const onSubmit = (data: { title: string; description: string }) => {
    if (!videoFile || !accessToken) return;
    submitUpload(
      {
        title: data.title,
        description: data.description,
        videoFile,
        accessToken,
      },
      {
        onSuccess: () => {
          router.replace('/videos');
        },
      },
    );
    methods.reset();
    setVideoFile(null);
    setThumbnail(null);
  };
  usePreventScroll(progress > 0 && isPending);
  return (
    <div className="pc:max-w-[84rem] pc:mt-6 tab:mt-6 pc:mb-36 tab:mb-11 pc:px-0 tab:px-8 mx-auto mt-4 mb-6 px-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="pc:h-[22rem] tab:h-[15.125rem] relative h-[8.5rem] cursor-pointer overflow-hidden rounded-lg bg-[var(--bg-34343A)]"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt="썸네일 미리보기"
                className="absolute inset-0 mx-auto my-0 h-full w-auto"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <IcVideo className="pc:w-[9rem] tab:w-[5rem] w-[2.5rem]" />
                <p className="pc:mt-7 tab:mt-5 pc:text-base tab:text-base mt-2.5 text-center text-sm font-medium text-[var(--gray-500)]">
                  파일을 드래그 하거나
                  <br />
                  이곳을 눌러 선택하세요.
                </p>
              </div>
            )}
          </div>
          <div className="pc:mt-[2.5rem] flex justify-between gap-5">
            <div className="pc:px-10 pc:py-10 pc:mb-0 pc:bg-[#202024] mb-16 flex-[1] rounded-lg pt-5">
              <Input
                name="title"
                type="text"
                label="영상 제목"
                placeholder="영상 제목을 작성하세요."
                rules={{
                  required: '영상 제목을 입력하세요.',
                  maxLength: {
                    value: 50,
                    message: '영상 제목은 50자 이하로 입력해주세요.',
                  },
                }}
              />
              <p className="pc:mt-10 mt-5 mb-[0.5rem] text-sm font-semibold">
                내용
              </p>
              <Textarea
                name="description"
                placeholder="어떤 영상인가요?"
                rules={{
                  required: '영상 소개를 입력하세요.',
                  maxLength: {
                    value: 300,
                    message: '소개글은 300자 이내로 입력해주세요.',
                  },
                }}
              />
            </div>
            <Button
              variant="solid"
              className="pc:w-[22.75rem] tab:w-[calc(100%-64px)] pc:static fixed bottom-8 w-[calc(100%-32px)] rounded-lg"
              type="submit"
              disabled={!isValid || !videoFile}
              aria-label="영상 저장 버튼"
            >
              작성완료
            </Button>
          </div>
        </form>
      </FormProvider>
      {isPending && progress > 0 && (
        <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/60">
          <div className="pc:h-[23.75rem] pc:w-[25rem] pc:gap-[1.875rem] pc:py-[1.56rem] flex h-[15.5rem] w-[16.25rem] flex-col items-center gap-[1.25rem] rounded-3xl bg-[#202024] py-[1.25rem]">
            <Lottie
              path="/json/jump.json"
              loop
              play
              className="pc:w-[12.5rem] pc:h-[16.25rem] h-[9.375rem] w-[7.375rem]"
            />
            <p className="text-gray-500">힘차게 업로드 중... 🤘 </p>
          </div>
        </div>
      )}
    </div>
  );
}
