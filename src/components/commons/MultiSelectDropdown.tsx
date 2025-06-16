'use client';
import IcSeletedArrow from '@/assets/icons/ic_seleted_arrow.svg';
import IcSeletedCheck from '@/assets/icons/ic_seleted_check.svg';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Fragment, useEffect, useRef, useState } from 'react';

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
  // 탭 미만일시
  const isTabletOrBelow =
    typeof window !== 'undefined' && window.innerWidth <= 1343;
  // 데이터를 넣어봅시다.
  const handleItem = (value: T) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
    if (isTabletOrBelow) {
      setIsOpen(false);
    }
  };
  // 2개 이상일시 외 ~
  const selectLabel = () => {
    if (selected.length === 0) return <span>{label}</span>;

    const first = options.find((option) => option.value === selected[0]);
    if (selected.length === 1) {
      return <span>{first?.label || label}</span>;
    }
    return (
      <span>
        {first?.label || ''}{' '}
        <span className="text-[var(--purple-500)]">{selected.length - 1}</span>
      </span>
    );
  };

  // tab미만 부터 스크롤 막기
  useEffect(() => {
    if (isOpen && isTabletOrBelow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isTabletOrBelow]);

  return (
    <Fragment>
      {isOpen && isTabletOrBelow && (
        <div
          className="fixed inset-0 z-10 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className="pc:h-10 pc:w-36 relative h-[2.25rem] w-[7.5rem] rounded-xl bg-[var(--gray-100)]"
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-full w-full items-center justify-between px-3 py-2 text-sm font-medium"
        >
          {selectLabel()}
          <IcSeletedArrow />
        </button>
        {isOpen && (
          <div className="pc:absolute pc:top-11 pc:left-0 pc:-translate-x-0 pc:-translate-y-0 pc:w-full fixed top-1/2 left-1/2 z-20 w-60 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-[#505057] shadow-[0_0_20px_-5px_rgba(0,0,0,0.6)]">
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
    </Fragment>
  );
}
