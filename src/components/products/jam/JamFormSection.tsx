'use client';

import { useCallback } from 'react';
import { Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import Input from '@/components/commons/Input';
import SearchInput from './SearchInput';
import { RegisterGatheringsRequest } from '@/types/gather';
import SessionFormSection from './SessionFormSection';
import DateFormSection from './DateFormSection';
import GenreFormSection from './GenreFormSection';
import DescriptionFormSection from './DescriptionFormSection';

const DIVIDER = 'mx-auto my-[2.5rem] w-[56rem] border-gray-800';

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
    <div className="mt-[2.5rem] flex h-auto w-[61rem] flex-col bg-[#202024] p-[2.5rem]">
      <div className="flex flex-col gap-[1.5rem]">
        {/** 모임 제목 */}
        <Input
          name="name"
          type="text"
          label="모임 제목"
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
      <DescriptionFormSection control={control} />
    </div>
  );
}
