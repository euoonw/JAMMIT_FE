import { PASSWORD_RULE } from '@/constants/regex';
import { GENRE_TAGS, SESSION_TAGS } from '@/constants/tags';
import {
  GENRE_ENUM_TO_KR,
  GENRE_KR_TO_ENUM,
  SESSION_ENUM_TO_KR,
  SESSION_KR_TO_ENUM,
} from '@/constants/tagsMapping';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useErrorModalStore } from '@/stores/useErrorModalStore';
import { EditFormData } from '@/types/modal';
import { BandSession, Genre } from '@/types/tags';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';
import ProfileImageUpload from '../ProfileImageUpload';
import TagSection from '../TagSection';
import ErrorModal from './ErrorModal';
import ModalWrapper from './ModalWrapper';

interface ModalEditProps {
  /** "확인" 버튼 클릭 시 실행할 콜백 */
  onSubmit: (data: EditFormData) => void;
  /** "x"버튼 클릭 시 실행할 콜백 */
  onCancel: () => void;
  /** 기존 프로필 정보를 가져오기 위한 초기값 */
  initialData: EditFormData;
  userId: number;
}

export default function ModalEdit({
  onCancel,
  onSubmit,
  initialData,
  userId,
}: ModalEditProps) {
  const { message, isOpen, close } = useErrorModalStore();
  const { handleImageUpload } = useImageUpload();

  // 영어 enum을 한글로 변환
  const initialSessionsKr =
    initialData.preferredBandSessions?.map(
      (session) => SESSION_ENUM_TO_KR[session],
    ) || [];

  const initialGenresKr =
    initialData.preferredGenres?.map((genre) => GENRE_ENUM_TO_KR[genre]) || [];

  const methods = useForm<EditFormData>({
    defaultValues: {
      email: initialData.email,
      username: initialData.username,
      password: initialData.password,
      image: initialData.image,
      preferredBandSessions: initialData.preferredBandSessions,
      preferredGenres: initialData.preferredGenres,
    },
    mode: 'onChange',
  });

  const { handleSubmit, setValue, watch } = methods;
  const imageUrl = watch('image');
  const password = watch('password');

  const handleFileChange = async (file: File) => {
    const uploadedUrl = await handleImageUpload(userId, file);
    if (uploadedUrl) {
      setValue('image', uploadedUrl);
    }
  };

  const handleSessionTagChange = useCallback(
    (selected: string[]) => {
      // 한글을 영어 enum으로 변환하여 저장
      const enumValues = selected.map((kr) => SESSION_KR_TO_ENUM[kr]);
      setValue('preferredBandSessions', enumValues as BandSession[]);
    },
    [setValue],
  );

  const handleGenreTagChange = useCallback(
    (selected: string[]) => {
      // 한글을 영어 enum으로 변환하여 저장
      const enumValues = selected.map((kr) => GENRE_KR_TO_ENUM[kr]);
      setValue('preferredGenres', enumValues as Genre[]);
    },
    [setValue],
  );

  const tagSections = [
    {
      key: 'session',
      label: '담당 세션',
      tags: SESSION_TAGS, // 한글 태그 사용
      initialSelected: initialSessionsKr, // 한글로 변환된 초기값
      onChange: handleSessionTagChange,
    },
    {
      key: 'genre',
      label: '선호 장르',
      tags: GENRE_TAGS, // 한글 태그 사용
      initialSelected: initialGenresKr, // 한글로 변환된 초기값
      onChange: handleGenreTagChange,
    },
  ];

  return (
    <>
      <ModalWrapper
        title="프로필 수정하기"
        onClose={onCancel}
        className="relative h-auto max-h-[90vh] w-[32.5rem] max-w-md overflow-y-auto rounded-lg bg-[#242429] p-[1.5rem]"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[1.5rem]"
          >
            <ProfileImageUpload
              imageFile={typeof imageUrl === 'string' ? imageUrl : null}
              onFileChange={handleFileChange}
            />

            <div className="flex flex-col gap-[1.5rem]">
              <Input name="username" type="text" label="이름" />
              <Input
                name="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                rules={PASSWORD_RULE}
              />
              <Input
                name="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                rules={{
                  required: '비밀번호 확인은 필수 입력입니다.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                }}
              />
            </div>

            <div className="flex flex-col gap-[1.5rem]">
              {tagSections.map(
                ({ key, label, tags, initialSelected, onChange }) => (
                  <TagSection
                    key={key}
                    label={label}
                    tags={tags}
                    initialSelected={initialSelected}
                    onChange={onChange}
                  />
                ),
              )}
            </div>

            <Button
              variant="solid"
              size="large"
              type="submit"
              className="w-full"
            >
              확인
            </Button>
          </form>
        </FormProvider>
      </ModalWrapper>
      {isOpen && <ErrorModal message={message} onClose={close} />}
    </>
  );
}
