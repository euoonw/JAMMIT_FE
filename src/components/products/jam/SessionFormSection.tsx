import { useCallback, useState, useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import Button from '@/components/commons/Button';
import SessionSelector from './SessionSelector';
import { SESSION_KEY_MAP } from '@/constants/tags';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { RegisterGatheringsRequest } from '@/types/gather';

interface SessionFormSectionProps {
  control: Control<RegisterGatheringsRequest>;
  setValue: UseFormSetValue<RegisterGatheringsRequest>;
  initialData?: RegisterGatheringsRequest;
}

export default function SessionFormSection({
  control,
  setValue,
  initialData,
}: SessionFormSectionProps) {
  const [sessionList, setSessionList] = useState(() => {
    if (initialData?.gatheringSessions?.length) {
      return initialData.gatheringSessions.map((s) => ({
        sortOption: SESSION_ENUM_TO_KR[s.bandSession] || '',
        count: s.recruitCount,
      }));
    }
    return [{ sortOption: '', count: 0 }];
  });

  const selectedSessions = sessionList
    .map((session) => session.sortOption)
    .filter((option) => option !== '');

  const handleAddSession = useCallback(() => {
    setSessionList((prev) => [...prev, { sortOption: '', count: 0 }]);
  }, []);

  const handleDeleteSession = useCallback((index: number) => {
    setSessionList((prev) => prev.filter((_, i) => i !== index));
  }, []);

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
    <div className="flex flex-col gap-[0.5rem]">
      <p className="text-lg font-semibold">모집 세션</p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-[0.75rem]">
          {sessionList.map(({ sortOption, count }, index) => (
            <SessionSelector
              key={index}
              session={
                sortOption ? { [SESSION_KEY_MAP[sortOption]]: count } : {}
              }
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
    </div>
  );
}
