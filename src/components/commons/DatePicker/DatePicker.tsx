'use client';

import { useCallback, useEffect, useState } from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimePicker } from './TimePicker';
import clsx from 'clsx';

import CalendarIcon from '@/assets/icons/ic_calendar.svg';

const HOUR_OPTIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const AM_PM_OPTIONS: ('AM' | 'PM')[] = ['PM', 'AM'];

interface DatePickerProps {
  value?: Date;
  onChange?: (val: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmPm] = useState<'PM' | 'AM'>('PM');
  const [isOpen, setIsOpen] = useState(false);

  function combineDateAndTime(
    date: Date,
    hour: number,
    minute: number,
    ampm: 'AM' | 'PM',
  ): Date {
    const hour24 = ampm === 'PM' ? (hour % 12) + 12 : hour % 12;
    return setMinutes(setHours(date, hour24), minute);
  }
  const handleDateChange = useCallback(
    (selectedDate?: Date) => {
      if (!selectedDate) return;

      const newDate = combineDateAndTime(selectedDate, hour, minute, ampm);
      setDate(newDate);
      onChange?.(newDate);
    },
    [hour, minute, ampm, onChange],
  );

  useEffect(() => {
    if (!date) {
      return;
    }
    const newDate = combineDateAndTime(date, hour, minute, ampm);
    if (newDate.getTime() !== date.getTime()) {
      setDate(newDate);
      onChange?.(newDate);
    }
  }, [hour, minute, ampm, date, onChange]);

  useEffect(() => {
    if (value) {
      setDate(value);
      const h = value.getHours();
      setHour(h % 12 === 0 ? 12 : h % 12);
      setAmPm(h >= 12 ? 'PM' : 'AM');
      setMinute(value.getMinutes());
    }
  }, [value]);

  const displayValue = date
    ? format(date, 'yy-MM-dd hh:mm a')
    : '날짜와 시간 선택하세요';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={clsx(
            'pc:w-[13.125rem] tab:max-w-[40rem] pc:justify-center flex h-[2.75rem] w-full items-center justify-between gap-[0.625rem] rounded-[0.5rem] bg-[#34343a] px-[1rem] text-[1rem] text-gray-100',
            isOpen ? 'border border-[#505057]' : 'border-none',
            !date && 'cursor-pointer text-gray-400',
          )}
        >
          {displayValue}
          <CalendarIcon width="1.125rem" height="1.25rem" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={4}
        align="start"
        className="box-shadow-lg flex h-[16.625rem] w-auto overflow-hidden border-[0.0625rem] border-[#505057] bg-[#34343a] p-[1.375rem] pr-[0.125rem]"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
        />

        <div className="mx-[0.1875rem] ml-[1.0625rem] h-full w-0 border-r-[1px] border-[#4a4e55]" />

        <div className="flex justify-between">
          <TimePicker items={HOUR_OPTIONS} selected={hour} onSelect={setHour} />
          <div className="mx-[0.1875rem] h-full w-0 border-r-[0.0625rem] border-[#4a4e55]" />
          <TimePicker
            items={MINUTE_OPTIONS}
            selected={minute}
            onSelect={setMinute}
          />
          <div className="mx-[0.1875rem] h-full w-0 border-r-[0.0625rem] border-[#4a4e55]" />
          <TimePicker
            items={AM_PM_OPTIONS}
            selected={ampm}
            onSelect={setAmPm}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
