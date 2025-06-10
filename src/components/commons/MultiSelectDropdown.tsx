'use client';
import { useClickOutside } from '@/hooks/useClickOutside';
import React, { useRef, useState } from 'react';
import IcSeletedArrow from '@/assets/icons/ic_seleted_arrow.svg';
import IcSeletedCheck from '@/assets/icons/ic_seleted_check.svg';

interface Option<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  label: string;
  options: Option<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
}

export default function MultiSelectDropdown<T>({
  label,
  options,
  selected,
  onChange,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  // 데이터를 넣어봅시다.
  const handleItem = (value: T) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };
  // 2개 이상일시 외 ~
  const selectLabel = (): string => {
    if (selected.length === 0) {
      return label;
    }
    const selectOption = options.find((option) => option.value === selected[0]);

    if (selected.length === 1) {
      return selectOption?.label || label;
    }
    return `${selectOption?.label || ''} 외 ${selected.length - 1}`;
  };
  return (
    <div className="relative h-10 w-36 rounded-lg bg-[var(--gray-100)]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-full w-full items-center justify-between px-3 py-2 text-sm font-medium"
      >
        {selectLabel()}
        <IcSeletedArrow />
      </button>
      {isOpen && (
        <div
          className="absolute top-11 z-10 w-full overflow-hidden rounded-lg border border-[#505057] shadow-[0_0_20px_-5px_rgba(0,0,0,0.6)]"
          ref={dropdownRef}
        >
          {options.map((item) => (
            <label
              htmlFor={String(item.value)}
              key={String(item.value)}
              className="flex cursor-pointer items-center gap-2.5 border-b border-b-[#2c2c30] bg-[var(--bg-34343A)] px-4 py-2.5 last:border-b-0 hover:bg-[#594d6c]"
            >
              <input
                type="checkbox"
                hidden
                className="peer"
                id={String(item.value)}
                name={String(item.value)}
                checked={selected.includes(item.value)}
                onChange={() => handleItem(item.value)}
              />
              <div className="peer relative h-4 w-4 rounded-sm bg-[#1F1F23] peer-checked:bg-[var(--purple-700)]">
                {selected.includes(item.value) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IcSeletedCheck />
                  </div>
                )}
              </div>
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
