'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDeviceType } from '@/hooks/useDeviceType';
import DropdownMenuList from './DropdownMenuList';
import { usePreventScroll } from '@/hooks/usePreventScroll';

interface DropdownProps {
  /** 사용자가 드롭다운 항목을 선택했을 때 호출되는 콜백 함수 */
  onSelect: (selectedDropdownMenu: string) => void;
  /** 드롭다운에 표시할 메뉴 항목 목록 */
  menuOptions: string[];
  /** 단일 아이콘(네비바 프로필) */
  singleIcon?: ReactNode;
  /** 텍스트 뒤 아이콘 */
  surfixIcon?: ReactNode;
  /** 텍스트 앞 아이콘 */
  prefixIcon?: ReactNode;
  isProfile?: boolean;
  /** Dropdown의 너비 */
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  /** 외부에서 관리하는 드롭다운 열림 상태 */
  isOpen?: boolean;
  /** 외부에서 드롭다운 상태를 변경하는 함수 */
  setIsOpen?: (isOpen: boolean) => void;
  placeholder?: string;
}

export default function Dropdown({
  onSelect,
  menuOptions,
  singleIcon,
  surfixIcon,
  prefixIcon,
  isProfile = false,
  size,
  value,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
  placeholder = '',
}: DropdownProps) {
  const sizeClass = {
    sm: 'w-[9rem]',
    md: 'pc:w-[26rem] tab:w-[32.5rem] w-full',
    lg: 'w-auto',
  }[size || 'lg'];

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [selectedDropdownMenu, setSelectedDropdownMenu] = useState(value || '');
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const displayValue = selectedDropdownMenu || '';
  const device = useDeviceType();
  const isMobile = device === 'mob';

  usePreventScroll(isOpen && isMobile);

  useEffect(() => {
    setSelectedDropdownMenu(value || '');
  }, [value]);

  useClickOutside(dropdownRef, () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  });

  const handleDropdownMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (DropdownMenu: string) => {
    setSelectedDropdownMenu(DropdownMenu);
    setIsOpen(false);
    onSelect(DropdownMenu);
  };

  return (
    <div
      className={`w-auto ${isProfile ? 'h-auto' : 'h-[2.75rem]'}`}
      ref={dropdownRef}
    >
      <div className="relative">
        <button
          onClick={handleDropdownMenu}
          className={`flex items-center justify-between gap-[0.625rem] rounded-lg border-0 bg-[#34343A] text-gray-100 ${sizeClass} ${
            isProfile
              ? 'h-auto w-auto border-none bg-transparent p-0'
              : 'px-[1rem] py-[0.625rem]'
          }`}
          type="button"
          aria-label="드롭다운 이미지 버튼"
        >
          {isProfile ? (
            singleIcon
          ) : prefixIcon ? (
            <>
              {prefixIcon}
              <input
                type="text"
                value={displayValue}
                placeholder={placeholder}
                readOnly
                className="bg-transparent text-left text-gray-100 outline-none placeholder:text-gray-400"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                value={displayValue}
                placeholder={placeholder}
                readOnly
                className="bg-transparent text-left text-gray-100 outline-none placeholder:text-gray-400"
              />
              {surfixIcon}
            </>
          )}
        </button>

        {isOpen && (
          <>
            {isMobile && !isProfile ? (
              <div
                className="fixed inset-0 z-50 bg-black/60"
                onClick={() => setIsOpen(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <DropdownMenuList
                    menuOptions={menuOptions}
                    onSelect={handleSelect}
                    size={size}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`absolute z-50 ${
                  isProfile ? '-right-10 -bottom-[0.625rem] w-[8.875rem]' : ''
                }`}
              >
                <DropdownMenuList
                  menuOptions={menuOptions}
                  onSelect={handleSelect}
                  size={size}
                  isMobile={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
