import React from 'react';
import MinusIcon from '@/assets/icons/ic_minus.svg';
import PlusIcon from '@/assets/icons/ic_plus.svg';

interface NumberInputProps {
  /** 현재 숫자 값 */
  count: number;
  /** 값이 변경될 때 사용되는 콜백 함수 */
  onChange: (newCount: number) => void;
  /** 최소값 */
  min?: number;
}

export default function NumberInput({
  count,
  onChange,
  min = 1,
}: NumberInputProps) {
  const decrease = () => {
    if (count > min) {
      onChange(count - 1);
    }
  };
  const increase = () => onChange(count + 1);

  return (
    <div className="flex h-[2.75rem] w-[6.6875rem] items-center gap-[1.125rem] rounded-lg bg-[#34343A] px-[1rem] py-[0.75rem]">
      <button onClick={decrease} type="button" aria-label="감소">
        <MinusIcon />
      </button>
      <span className="w-auto text-center text-sm text-white">{count}</span>
      <button onClick={increase} type="button" aria-label="증가">
        <PlusIcon />
      </button>
    </div>
  );
}
