'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Control,
  UseFormWatch,
  UseFormSetValue,
  Controller,
} from 'react-hook-form';
import Input from '@/components/commons/Input';
import TextArea from '@/components/commons/Textarea';
import TagSelector from '@/components/commons/TagSelector';
import Button from '@/components/commons/Button';
import { DatePicker } from '@/components/commons/DatePicker/DatePicker';
import SearchInput from './SearchInput';
import SessionSelector from './SessionSelector';
import { GENRE_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import { GENRE_KR_TO_ENUM, SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { RegisterGatheringsRequest } from '@/types/gather';
import { GenreType } from '@/types/tags';
import { formatDateToLocal } from '@/utils/formatDateToLocal';
import { useWatch } from 'react-hook-form';

const DIVIDER = 'mx-auto my-[2.5rem] w-[56rem] border-gray-800';

const DATE_FIELDS = [
  {
    name: 'recruitDateTime' as const,
    label: '모집 마감일',
    htmlFor: 'end',
  },
  {
    name: 'gatheringDateTime' as const,
    label: '모임 날짜',
    htmlFor: 'day',
  },
] as const;

interface JamFormSectionProps {
  /** 폼 필드 제어 */
  control: Control<RegisterGatheringsRequest>;
  /** 필드 값 관찰 */
  watch: UseFormWatch<RegisterGatheringsRequest>;
  /** 필드 값을 외부에서 설정 */
  setValue: UseFormSetValue<RegisterGatheringsRequest>;
  /** 초기값 */
  initialData?: RegisterGatheringsRequest;
}

export default function JamFormSection({
  control,
  watch,
  setValue,
  initialData,
}: JamFormSectionProps) {
  const [sessionList, setSessionList] = useState(() => {
    if (initialData?.gatheringSessions?.length) {
      return initialData.gatheringSessions.map((s) => ({
        sortOption: SESSION_ENUM_TO_KR[s.bandSession] || '',
        count: s.recruitCount,
      }));
    }
    return [{ sortOption: '', count: 0 }];
  });

  const place = watch('place') || '';

  // 빈 문자열 제외 이미 선택된 세션 옵션들을 계산
  const selectedSessions = sessionList
    .map((session) => session.sortOption)
    .filter((option) => option !== '');

  // 장소 선택
  const handlePlaceChange = useCallback(
    (val: string) => {
      setValue('place', val);
    },
    [setValue],
  );

  // 세션 추가
  const handleAddSession = useCallback(() => {
    setSessionList((prev) => [...prev, { sortOption: '', count: 0 }]);
  }, []);

  // 세션 삭제
  const handleDeleteSession = useCallback((index: number) => {
    setSessionList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // 세션 드롭다운 변경
  const handleSortOptionChange = useCallback(
    (index: number, newSortOption: string) => {
      setSessionList((prev) =>
        prev.map((session, idx) =>
          idx === index ? { ...session, sortOption: newSortOption } : session,
        ),
      );
    },
    [],
  );

  // 세션 드롭다운 인원 변경
  const handleCountChange = useCallback(
    (index: number, newCount: number) => {
      setSessionList((prev) => {
        const newList = prev.map((session, i) =>
          i === index ? { ...session, count: newCount } : session,
        );

        setValue(
          `gatheringSessions`,
          newList
            .filter((s) => s.sortOption !== '')
            .map((s) => ({
              bandSession: SESSION_KEY_MAP[s.sortOption],
              recruitCount: s.count,
            })),
        );
        return newList;
      });
    },
    [setValue],
  );

  const handleTagChange = useCallback(
    (selectedTags: string[]) => {
      const convertedTags = selectedTags
        .map((tag) => GENRE_KR_TO_ENUM[tag])
        .filter(Boolean) as GenreType[];
      setValue('genres', convertedTags);
    },
    [setValue],
  );

  const gatheringSessions = useWatch({ name: 'gatheringSessions', control });

  useEffect(() => {
    if (gatheringSessions?.length) {
      setSessionList(
        gatheringSessions.map((s) => ({
          sortOption: SESSION_ENUM_TO_KR[s.bandSession],
          count: s.recruitCount,
        })),
      );
    }
  }, [gatheringSessions]);

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
        <div className="flex gap-[1.25rem]">
          {DATE_FIELDS.map(({ name, label, htmlFor }) => (
            <div key={name} className="flex flex-col gap-[0.5rem]">
              <label htmlFor={htmlFor} className="font-semibold">
                {label}
              </label>
              <Controller
                name={name}
                control={control}
                rules={{ required: `${label}을 선택하세요.` }}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      if (!date) {
                        return field.onChange('');
                      }
                      field.onChange(formatDateToLocal(date));
                    }}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <hr className={DIVIDER} />

      {/** 모집 세션 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모집 세션</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-[0.75rem]">
            {sessionList.map(({ sortOption, count }, index) => (
              <SessionSelector
                key={index}
                session={{ [SESSION_KEY_MAP[sortOption]]: count }}
                sortOption={sortOption}
                setSortOption={(val) => handleSortOptionChange(index, val)}
                onChange={(val) => handleCountChange(index, val)}
                selectedOptions={selectedSessions}
              />
            ))}
          </div>
          <div className="flex gap-[0.75rem]">
            <Button variant="outline" size="small" onClick={handleAddSession}>
              추가
            </Button>

            <Button
              variant="outline"
              size="small"
              onClick={() => handleDeleteSession(sessionList.length - 1)}
              disabled={sessionList.length === 1}
            >
              삭제
            </Button>
          </div>
        </div>

        <hr className={DIVIDER} />

        {/* 모임 장르 */}
        <div className="flex flex-col gap-[0.5rem]">
          <p className="text-lg font-semibold">모임 장르</p>
          <TagSelector
            mode="selectable"
            tags={GENRE_TAGS}
            onChange={handleTagChange}
            initialSelected={(watch('genres') || []).map(
              (enumVal) =>
                Object.keys(GENRE_KR_TO_ENUM).find(
                  (k) => GENRE_KR_TO_ENUM[k] === enumVal,
                ) || '',
            )}
          />
        </div>

        <hr className={DIVIDER} />

        {/* 소개글 */}
        <div className="flex flex-col gap-[0.5rem]">
          <p className="text-lg font-semibold">소개글</p>
          <Controller
            name="description"
            control={control}
            rules={{ required: '소개글을 입력하세요.' }}
            render={({ field }) => (
              <TextArea
                placeholder="어떤 일이 일어날까요?"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
