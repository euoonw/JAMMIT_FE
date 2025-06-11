'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import AuthCard from '@/components/commons/AuthCard';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import ProfileImageUpload from '@/components/commons/ProfileImageUpload';
import TagSection from '@/components/commons/TagSection';
import { useSignupStore } from '@/stores/useSignupStore';
import { useSignupMutation } from '@/hooks/queries/user/useSignupMutation';
import { GENRE_KR_TO_ENUM, SESSION_KR_TO_ENUM } from '@/constants/tagsMapping';
import { GENRE_TAGS, SESSION_TAGS } from '@/constants/tags';

interface FormValues {
  image: File;
  nickname: string;
  session: string[];
  genre: string[];
}

export default function SignupStep2Page() {
  const router = useRouter();
  const { email, name, password } = useSignupStore();

  const hasCheckedRef = useRef(false);
  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    if (!email || !name || !password) {
      // TODO: 모달 반영
      alert('이전 단계 정보를 확인할 수 없어, 다시 입력이 필요합니다.');
      router.replace('/signup/step1');
    }
  }, [email, name, password, router]);

  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: { image: undefined, nickname: '', session: [], genre: [] },
    shouldUnregister: false,
  });

  const {
    formState: { isValid },
    setValue,
    control,
  } = methods;

  const handleSessionTagChange = (selected: string[]) => {
    setValue('session', selected);
  };
  const handleGenreTagChange = (selected: string[]) => {
    setValue('genre', selected);
  };

  const tagSections = [
    {
      key: 'session',
      label: '담당 세션',
      tags: SESSION_TAGS,
      initialSelected: [],
      onChange: handleSessionTagChange,
    },
    {
      key: 'genre',
      label: '선호 장르',
      tags: GENRE_TAGS,
      initialSelected: [],
      onChange: handleGenreTagChange,
    },
  ];

  const { mutateAsync } = useSignupMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!email || !name || !password) {
      // TODO: 모달 반영
      alert(
        '이메일, 이름, 비밀번호 정보가 유실되었습니다.\n다시 회원가입을 진행해주세요.',
      );
      router.replace('/signup/step1');
      return;
    }

    const preferredGenres = data.genre.map((kr) => GENRE_KR_TO_ENUM[kr]);
    const preferredBandSessions = data.session.map(
      (kr) => SESSION_KR_TO_ENUM[kr],
    );

    // TODO: 프로필 업데이트 기능 추가
    const fullData = {
      email,
      username: name,
      password,
      nickname: data.nickname,
      preferredGenres,
      preferredBandSessions,
    };

    await mutateAsync(fullData);

    router.push('/login');

    useSignupStore.getState().resetSignupData();
  };

  return (
    <AuthCard title="프로필 만들기">
      <div className="flex w-[25.125rem] flex-col items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="flex w-full flex-col gap-[1.5rem]"
          >
            <div className="mx-auto">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ProfileImageUpload
                    imageFile={field.value}
                    onFileChange={field.onChange}
                    profileSize={128}
                    editIconSize={41}
                    offsetX={80}
                    offsetY={40}
                  />
                )}
              />
            </div>

            <Input
              name="nickname"
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              rules={{
                required: '닉네임은 필수 입력입니다.',
              }}
            />

            <div className="flex flex-col gap-4">
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
              className="w-full"
              type="submit"
              disabled={!isValid}
            >
              완료
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthCard>
  );
}
