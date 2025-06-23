import { useCallback } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import Button from '@/components/commons/Button';
import SessionSelector from './SessionSelector';
import { SESSION_KEY_MAP, SESSION_TAGS } from '@/constants/tags';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { RegisterGatheringsRequest } from '@/types/gather';

const DEFAULT_BAND_SESSION = SESSION_KEY_MAP[SESSION_TAGS[0]];

interface SessionFormSectionProps {
  control: Control<RegisterGatheringsRequest>;
}

export default function SessionFormSection({
  control,
}: SessionFormSectionProps) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'gatheringSessions',
  });

  // 이미 선택된 세션 옵션(중복 방지)
  const selectedSessions = fields.map((field) =>
    field.bandSession ? SESSION_ENUM_TO_KR[field.bandSession] : '',
  );

  // 세션 옵션 변경
  const handleSortOptionChange = useCallback(
    (index: number, newSortOption: string) => {
      const bandSession =
        SESSION_KEY_MAP[newSortOption] || DEFAULT_BAND_SESSION;
      update(index, { ...fields[index], bandSession });
    },
    [fields, update],
  );

  // 인원 수 변경
  const handleCountChange = useCallback(
    (index: number, newCount: number) => {
      update(index, { ...fields[index], recruitCount: newCount });
    },
    [fields, update],
  );

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <p className="text-sm font-semibold text-gray-100">모집 세션</p>
      <div className="pc:gap-[0rem] pc:flex-row flex flex-col justify-between gap-[1rem]">
        <div className="flex flex-col gap-[0.75rem]">
          {fields.map((field, index) => (
            <SessionSelector
              key={field.id}
              session={
                field.bandSession
                  ? { [field.bandSession]: field.recruitCount }
                  : {}
              }
              sortOption={
                field.bandSession ? SESSION_ENUM_TO_KR[field.bandSession] : ''
              }
              setSortOption={(val) => handleSortOptionChange(index, val)}
              onChange={(val) => handleCountChange(index, val)}
              selectedOptions={selectedSessions}
            />
          ))}
        </div>
        <div className="flex gap-[0.75rem]">
          <Button
            variant="solid"
            onClick={() =>
              append({ bandSession: DEFAULT_BAND_SESSION, recruitCount: 1 })
            }
            className="pc:w-[6.8125rem] w-[5.6875rem]"
          >
            추가
          </Button>
          <Button
            variant="outline"
            onClick={() => remove(fields.length - 1)}
            disabled={fields.length === 1}
            className="pc:w-[6.8125rem] w-[5.6875rem]"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
