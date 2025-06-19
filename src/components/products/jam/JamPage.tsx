'use client';

import Button from '@/components/commons/Button';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import ModalInteraction from '@/components/commons/Modal/ModalInteraction';
import ImageEdit from '@/components/products/jam/ImageEdit';
import JamFormSection from '@/components/products/jam/JamFormSection';
import { useGatherModify } from '@/hooks/queries/gather/useGatherModify';
import { useGatherRegister } from '@/hooks/queries/gather/useGatherRegister';
import { useUserStore } from '@/stores/useUserStore';
import { useToastStore } from '@/stores/useToastStore';
import { RegisterGatheringsRequest } from '@/types/gather';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const TEMP_STORAGE_KEY = 'jam_temp_data';

interface JamPageProps {
  formType?: 'register' | 'edit';
  groupId?: number;
  initialData?: RegisterGatheringsRequest;
}

export default function JamPage({
  formType = 'register',
  groupId,
  initialData,
}: JamPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isRefreshing = useUserStore((state) => state.isRefreshing);
  const isLoaded = useUserStore((state) => state.isLoaded);
  const { show } = useToastStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && isLoaded && !isRefreshing) {
      setShowLoginModal(true);
    }
  }, [isLoggedIn, isLoaded, isRefreshing]);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    router.push('/login');
  };

  const methods = useForm<RegisterGatheringsRequest>({
    defaultValues: initialData ?? {
      name: '',
      thumbnail: '',
      place: '',
      description: '',
      gatheringDateTime: '',
      recruitDateTime: '',
      genres: [],
      gatheringSessions: [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
  } = methods;

  const thumbnail = watch('thumbnail');

  const { mutate: registerGathering } = useGatherRegister();
  const { mutate: modifyGathering } = useGatherModify();

  // 임시저장 데이터 불러오기
  useEffect(() => {
    if (formType === 'register') {
      const savedData = localStorage.getItem(TEMP_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as RegisterGatheringsRequest;
        Object.entries(parsedData).forEach(([key, value]) => {
          setValue(key as keyof RegisterGatheringsRequest, value);
        });
      }
    }
  }, [formType, setValue]);

  // 임시저장
  const handleTempSave = () => {
    const formData = watch();
    localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(formData));
    show('임시저장이 완료되었습니다.');
  };

  const onSubmit = (data: RegisterGatheringsRequest) => {
    if (formType === 'edit' && groupId) {
      modifyGathering({
        id: groupId,
        name: data.name,
        thumbnail: data.thumbnail,
        place: data.place,
        gatheringDateTime: data.gatheringDateTime,
        totalRecruitCount: data.gatheringSessions.reduce(
          (sum, session) => sum + session.recruitCount,
          0,
        ),
        recruitDeadline: data.recruitDateTime,
        genres: data.genres,
        description: data.description,
        gatheringSessions: data.gatheringSessions,
      });
      router.push(`/group/${groupId}`);
    } else {
      registerGathering(data, {
        onSuccess: (response) => {
          localStorage.removeItem(TEMP_STORAGE_KEY);
          queryClient.refetchQueries({
            queryKey: ['list'],
          });
          router.push(`/?showShareModal=true&groupId=${response.id}`);
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GroupPageLayout
          banner={<ImageEdit />}
          actionButtons={
            <div className="pc:flex-col mt-[2.5rem] flex gap-[1rem]">
              {formType === 'register' && (
                <Button
                  variant="outline"
                  className="w-[11.375rem]"
                  type="button"
                  onClick={handleTempSave}
                >
                  임시 저장하기
                </Button>
              )}
              <Button
                variant="solid"
                className="w-[11.375rem]"
                type="submit"
                disabled={!isValid || !thumbnail}
              >
                {formType === 'edit' ? '모임 수정하기' : '모임 만들기'}
              </Button>
            </div>
          }
          isTab={false}
        >
          <JamFormSection
            control={control}
            watch={watch}
            setValue={setValue}
            initialData={initialData}
          />
        </GroupPageLayout>
      </form>
      {showLoginModal && (
        <ModalInteraction
          message="로그인 페이지로 이동하시겠습니까?"
          onConfirm={handleLoginModalClose}
          onClose={handleLoginModalClose}
          isShowCancel={false}
        />
      )}
    </FormProvider>
  );
}
