'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageEdit from '@/components/products/jam/ImageEdit';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import Button from '@/components/commons/Button';
import JamFormSection from '@/components/products/jam/JamFormSection';
import { RegisterGatheringsRequest } from '@/types/gather';
import { useGatherRegister } from '@/hooks/queries/gather/useGatherRegister';
import { useGatherModify } from '@/hooks/queries/gather/useGatherModify';

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
  const router = useRouter();
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

  const { mutate: registerGathering } = useGatherRegister();
  const { mutate: modifyGathering } = useGatherModify();

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
            <Button
              variant="solid"
              className="mt-[2.5rem] w-[22.75rem]"
              type="submit"
              disabled={!isValid}
            >
              {formType === 'edit' ? '모임 수정하기' : '모임 만들기'}
            </Button>
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
    </FormProvider>
  );
}
