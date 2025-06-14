import { Control, Controller } from 'react-hook-form';
import TextArea from '@/components/commons/Textarea';
import { RegisterGatheringsRequest } from '@/types/gather';

interface DescriptionFormSectionProps {
  control: Control<RegisterGatheringsRequest>;
}

export default function DescriptionFormSection({
  control,
}: DescriptionFormSectionProps) {
  return (
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
  );
}
