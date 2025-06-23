import { Control, Controller } from 'react-hook-form';
import TagSelector from '@/components/commons/TagSelector';
import { GENRE_TAGS } from '@/constants/tags';
import { GENRE_KR_TO_ENUM, GENRE_ENUM_TO_KR } from '@/constants/tagsMapping';
import { RegisterGatheringsRequest } from '@/types/gather';
import { GenreType } from '@/types/tags';

interface GenreFormSectionProps {
  control: Control<RegisterGatheringsRequest>;
}

export default function GenreFormSection({ control }: GenreFormSectionProps) {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <p className="text-sm font-semibold text-gray-100">모임 장르</p>
      <Controller
        name="genres"
        control={control}
        rules={{ required: '장르를 선택하세요.' }}
        render={({ field }) => {
          const initialSelected = (field.value || []).map(
            (genre: GenreType) => GENRE_ENUM_TO_KR[genre] || '',
          );
          return (
            <TagSelector
              key={initialSelected.join(',')}
              mode="selectable"
              tags={GENRE_TAGS}
              onChange={(tags) => {
                const convertedTags = tags
                  .map((tag) => GENRE_KR_TO_ENUM[tag])
                  .filter(Boolean) as GenreType[];
                field.onChange(convertedTags);
              }}
              initialSelected={initialSelected}
            />
          );
        }}
      />
    </div>
  );
}
