import { useCallback, useRef } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import TagSelector from '@/components/commons/TagSelector';
import { GENRE_TAGS } from '@/constants/tags';
import { GENRE_KR_TO_ENUM } from '@/constants/tagsMapping';
import { RegisterGatheringsRequest } from '@/types/gather';
import { GenreType } from '@/types/tags';

interface GenreFormSectionProps {
  setValue: UseFormSetValue<RegisterGatheringsRequest>;
  watch: UseFormWatch<RegisterGatheringsRequest>;
}

export default function GenreFormSection({
  setValue,
  watch,
}: GenreFormSectionProps) {
  const pendingUpdateRef = useRef<string[] | null>(null);

  const handleTagChange = useCallback(
    (tags: string[]) => {
      pendingUpdateRef.current = tags;
      requestAnimationFrame(() => {
        if (pendingUpdateRef.current) {
          const convertedTags = pendingUpdateRef.current
            .map((tag) => GENRE_KR_TO_ENUM[tag])
            .filter(Boolean) as GenreType[];
          setValue('genres', convertedTags);
          pendingUpdateRef.current = null;
        }
      });
    },
    [setValue],
  );

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <p className="text-sm font-semibold">모임 장르</p>
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
  );
}
