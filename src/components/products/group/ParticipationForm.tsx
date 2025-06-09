'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/commons/Button';
import TextArea from '@/components/commons/Textarea';
import TagSelector from '@/components/commons/TagSelector';
import { GatheringDetailResponse } from '@/types/gathering';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { ParticipationFormTitle } from '@/components/products/group/Typographys';

interface ParticipationFormData {
  session: string[];
  introduction: string;
}

interface ParticipationFormProps {
  gathering: GatheringDetailResponse;
  onComplete: (data: { session: string; introduction: string }) => void;
}

export default function ParticipationForm({
  gathering,
  onComplete,
}: ParticipationFormProps) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    setValue,
  } = useForm<ParticipationFormData>({
    mode: 'onChange',
    defaultValues: {
      session: [],
      introduction: '',
    },
  });

  const { sessions } = gathering;

  const availableTags: string[] = [];
  const disabledTags: string[] = [];

  sessions.forEach((s) => {
    const tag = SESSION_ENUM_TO_KR[s.bandSession];
    availableTags.push(tag);
    if (s.currentCount >= s.recruitCount) {
      disabledTags.push(tag);
    }
  });

  const handleSessionChange = (selected: string[]) => {
    setValue('session', selected);
  };

  const handleFormSubmit = (data: ParticipationFormData) => {
    onComplete({ session: data.session[0], introduction: data.introduction });
  };

  return (
    <div className="w-[22.625rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-[1.25rem]"
      >
        <div className="flex flex-col gap-[1.25rem] rounded-[0.5rem] bg-[#212226] p-[1.75rem]">
          <div className="w-full text-center">
            <ParticipationFormTitle>함께하기</ParticipationFormTitle>
          </div>

          <div>
            <ParticipationFormTitle>신청 세션</ParticipationFormTitle>
            <TagSelector
              mode="selectable"
              tags={availableTags}
              disabledTags={disabledTags}
              selectMode="single"
              onChange={handleSessionChange}
            />
          </div>

          <div>
            <ParticipationFormTitle>간단 소개</ParticipationFormTitle>
            <Controller
              name="introduction"
              control={control}
              rules={{ required: '소개를 입력해주세요.' }}
              render={({ field }) => (
                <TextArea
                  placeholder="어떤 연주를 하고 싶나요?"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="solid"
          disabled={!isValid}
          className="w-[22.75rem]"
        >
          신청 완료
        </Button>
      </form>
    </div>
  );
}
