'use client';
import { useCallback, useMemo, useState } from 'react';
import CheckIcon from '@/assets/icons/ic_check.svg';
import PlusIcon from '@/assets/icons/ic_plus.svg';
import { clsx } from 'clsx';

interface TagSelectorProps {
  tags: string[];
  mode: 'selectable' | 'readonly';
  initialSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabledTags?: string[];
  selectMode?: 'single' | 'multiple';
}

export default function TagSelector({
  tags,
  mode = 'selectable',
  selectMode = 'multiple',
  initialSelected = [],
  disabledTags = [],
  onChange,
}: TagSelectorProps) {
  const [selected, setSelected] = useState<string[]>(
    mode === 'selectable' ? initialSelected : [],
  );

  const selectedSet = useMemo(() => {
    return new Set(mode === 'readonly' ? initialSelected : selected);
  }, [mode, initialSelected, selected]);

  const disabledSet = useMemo(() => new Set(disabledTags), [disabledTags]);

  const toggleTag = useCallback(
    (tag: string) => {
      if (mode === 'readonly' || disabledSet.has(tag)) {
        return;
      }

      setSelected((prev) => {
        let newSelected: string[];

        if (selectMode === 'single') {
          newSelected = prev.includes(tag) ? [] : [tag];
        } else {
          newSelected = prev.includes(tag)
            ? prev.filter((t) => t !== tag)
            : [...prev, tag];
        }

        setTimeout(() => {
          onChange?.(newSelected);
        }, 0);

        return newSelected;
      });
    },
    [mode, onChange, disabledSet, selectMode],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-[0.5rem]">
        {tags.map((tag, index) => {
          const isActive = selectedSet.has(tag);
          const isDisabled = disabledSet.has(tag);

          const baseClass =
            'box-border flex h-[2rem] items-center justify-center rounded-[0.5rem] border bg-[#34343a] pr-[0.5rem] pl-[0.75rem] text-sm font-medium text-gray-100';
          const activeClass = isActive
            ? 'border-[#9747FF] shadow-md'
            : 'border-transparent';
          const disabledClass = isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : mode === 'selectable'
              ? 'cursor-pointer'
              : 'cursor-default';

          const icon = isActive || isDisabled ? <CheckIcon /> : <PlusIcon />;

          return (
            <button
              type="button"
              key={`${tag}-${index}`}
              onClick={() => toggleTag(tag)}
              className={clsx(baseClass, activeClass, disabledClass)}
            >
              {tag}
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
