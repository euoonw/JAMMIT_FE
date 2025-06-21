import { Control, Controller } from 'react-hook-form';
import { DatePicker } from '@/components/commons/DatePicker/DatePicker';
import { RegisterGatheringsRequest } from '@/types/gather';
import { formatDateToLocal } from '@/utils/formatDateToLocal';

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

interface DateFormSectionProps {
  control: Control<RegisterGatheringsRequest>;
}

export default function DateFormSection({ control }: DateFormSectionProps) {
  return (
    <div className="pc:flex-row flex flex-col gap-[1.25rem]">
      {DATE_FIELDS.map(({ name, label, htmlFor }) => (
        <div key={name} className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor={htmlFor}
            className="text-sm font-semibold text-gray-100"
          >
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
  );
}
