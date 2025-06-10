'use client';

import ImageEdit from '@/components/products/jam/ImageEdit';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import Button from '@/components/commons/Button';
import JamFormSection from '@/components/products/jam/JamFormSection';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterGatheringsRequest } from '@/types/gather';
import { useGatherRegister } from '@/hooks/queries/gather/useGatherRegister';

export default function JamPage() {
  const methods = useForm<RegisterGatheringsRequest>({
    defaultValues: {
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

  const onSubmit = (data: RegisterGatheringsRequest) => {
    registerGathering(data);
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
              모임 만들기
            </Button>
          }
          isTab={false}
        >
          <JamFormSection control={control} watch={watch} setValue={setValue} />
        </GroupPageLayout>
      </form>
    </FormProvider>
  );
}
