'use client';

import * as React from 'react';
import { DayPicker, MonthCaptionProps, useDayPicker } from 'react-day-picker';
import ArrowRight from '@/assets/icons/ic_arrow_right.svg';
import ArrowLeft from '@/assets/icons/ic_arrow_left.svg';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';

import { enUS } from 'date-fns/locale';

const customKo = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][n],
  },
};

function CustomMonthCaption(props: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  return (
    <div className="relative flex w-full items-center justify-center py-[0.3125rem]">
      <button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="absolute left-1 cursor-pointer p-0 opacity-50 hover:opacity-100 disabled:opacity-20"
      >
        <ArrowLeft />
      </button>

      <span className="text-sm font-medium">
        {format(props.calendarMonth.date, 'MMMM yyyy', { locale: enUS })}
      </span>

      <button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="absolute right-1 cursor-pointer p-0 opacity-50 hover:opacity-100 disabled:opacity-20"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={customKo}
      showOutsideDays={showOutsideDays}
      className={cn('w-[15.625rem] rounded-[0.5rem] text-gray-100', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row',
        month: 'flex flex-col',
        caption:
          'flex justify-center relative items-center w-full py-[0.3125rem]',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center',
        nav_button: cn(
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer',
        ),
        table: 'w-full border-collapse space-x-1',
        weekdays: 'h-[2rem] w-full font-bold text-[0.875rem] text-center',
        row: 'flex h-[2rem] ',
        day: cn(
          'rounded-[0.5rem] w-[2.1875rem] text-center text-[0.875rem] focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#9900FF] [&:has([aria-selected].day-range-end)]:rounded-[0.5rem] cursor-pointer',
        ),
        day_button: cn('size-8 p-0 font-semibold aria-selected:opacity-100'),
        selected: 'bg-[#9900FF] text-gray-100',
        today: 'text-[#9900ff]',
        outside: 'day-outside text-gray-500',
        disabled: 'opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      hideNavigation
      components={{
        MonthCaption: CustomMonthCaption,
      }}
      {...props}
    />
  );
}

export { Calendar };
