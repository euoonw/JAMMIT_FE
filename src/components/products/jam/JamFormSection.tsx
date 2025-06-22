'use client';

import { useCallback } from 'react';
import { Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import Input from '@/components/commons/Input';
import SearchInput from './SearchInput';
import { RegisterGatheringsRequest } from '@/types/gather';
import SessionFormSection from './SessionFormSection';
import DateFormSection from './DateFormSection';
import GenreFormSection from './GenreFormSection';
import TextArea from '@/components/commons/Textarea';

const DIVIDER = 'my-[2.5rem] max-w-[56rem] w-full border-gray-800';

interface JamFormSectionProps {
  control: Control<RegisterGatheringsRequest>;
  watch: UseFormWatch<RegisterGatheringsRequest>;
  setValue: UseFormSetValue<RegisterGatheringsRequest>;
  initialData?: RegisterGatheringsRequest;
}

export default function JamFormSection({
  control,
  watch,
  setValue,
  initialData,
}: JamFormSectionProps) {
  const place = watch('place') || '';

  const handlePlaceChange = useCallback(
    (val: string) => {
      setValue('place', val);
    },
    [setValue],
  );

  return (
    <div className="pc:max-w-[60rem] mt-[2.5rem] flex h-auto w-full flex-col bg-[#202024] p-[2.5rem]">
      <div className="pc:w-full tab:max-w-[40rem] flex w-full flex-col gap-[1.5rem]">
        {/** 모임 제목 */}
        <Input
          name="name"
          type="text"
          label="모임 제목"
          size="lg"
          placeholder="모임 제목을 작성하세요."
          rules={{
            required: '모임 제목을 입력하세요.',
            maxLength: {
              value: 30,
              message: '모임 제목은 30자 이하로 입력해주세요.',
            },
          }}
        />

        {/** 모임 장소 */}
        <SearchInput value={place} onChange={handlePlaceChange} />

        {/** 모집 마감일 / 모임 날짜 */}
        <DateFormSection control={control} />
      </div>

      <hr className={DIVIDER} />

      {/** 모집 세션 */}
      <SessionFormSection
        control={control}
        setValue={setValue}
        initialData={initialData}
      />

      <hr className={DIVIDER} />

      {/* 모임 장르 */}
      <GenreFormSection watch={watch} setValue={setValue} />

      <hr className={DIVIDER} />

      {/* 소개글 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-sm font-semibold text-gray-100">소개글</p>
        <TextArea
          name="description"
          placeholder="어떤 일이 일어날까요?"
          rules={{
            required: '소개글을 입력하세요.',
            maxLength: {
              value: 500,
              message: '소개글은 500자 이내로 입력해주세요.',
            },
          }}
        />
      </div>
    </div>
  );
}
