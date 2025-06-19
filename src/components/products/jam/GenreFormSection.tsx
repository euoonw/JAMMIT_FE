import { useCallback } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import TagSelector from '@/components/commons/TagSelector';
import { GENRE_TAGS } from '@/constants/tags';
import { GENRE_KR_TO_ENUM, GENRE_ENUM_TO_KR } from '@/constants/tagsMapping';
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
  const handleTagChange = useCallback(
    (tags: string[]) => {
      const convertedTags = tags
        .map((tag) => GENRE_KR_TO_ENUM[tag])
        .filter(Boolean) as GenreType[];
      setValue('genres', convertedTags);
    },
    [setValue],
  );

  const currentGenres = watch('genres') || [];
  const initialSelected = currentGenres.map(
    (genre) => GENRE_ENUM_TO_KR[genre] || '',
  );

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <p className="text-sm font-semibold text-gray-100">모임 장르</p>
      <TagSelector
        key={initialSelected.join(',')}
        mode="selectable"
        tags={GENRE_TAGS}
        onChange={handleTagChange}
        initialSelected={initialSelected}
      />
    </div>
  );
}
