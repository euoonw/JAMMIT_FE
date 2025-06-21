'use client';

import { useRef } from 'react';
import Script from 'next/script';
import SearchIcon from '@/assets/icons/ic_search.svg';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const { daum } = window;
    if (!daum?.Postcode) {
      return;
    }

    const postcode = new daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: (data: any) => {
        onChange(data.address);
        inputRef.current?.focus();
      },
    });
    postcode.open();
  };

  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      <div className="flex flex-col gap-[0.5rem]">
        <label className="block text-sm font-semibold text-gray-100">
          모임 장소
        </label>
        <div className="pc:w-full tab:max-w-[40rem] relative w-full text-gray-400">
          <label className="block cursor-pointer">
            <input
              ref={inputRef}
              value={value}
              placeholder="장소명을 검색하세요."
              readOnly
              className="h-[2.75rem] w-full rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem]"
              onClick={handleSearchClick}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={handleSearchClick}
              aria-label="모임 장소 찾기 버튼"
            >
              <SearchIcon />
            </button>
          </label>
        </div>
      </div>
    </>
  );
}
