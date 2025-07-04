'use client';

import Image from 'next/image';
import { memo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import Button from '@/components/commons/Button';
import { imgChange } from '@/utils/imgChange';
import { usePreventScroll } from '@/hooks/usePreventScroll';
import { useDeviceType } from '@/hooks/useDeviceType';

const MOBILE_FIRST_RENDERING = 6;
const DEFAULT_FIRST_RENDERING = 12;
const TOTAL_IMAGES = 18;

interface ModalImgEditProps {
  /** "확인" 버튼 클릭 시 실행할 콜백 */
  onSubmit: (image: string) => void;
  onClose: () => void;
}

function ModalImgEdit({ onSubmit, onClose }: ModalImgEditProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(DEFAULT_FIRST_RENDERING);
  const [mounted, setMounted] = useState(false);
  const device = useDeviceType();

  useClickOutside(modalRef, onClose);
  usePreventScroll(true);

  useEffect(() => {
    const firstCount =
      device === 'mob' ? MOBILE_FIRST_RENDERING : DEFAULT_FIRST_RENDERING;
    setVisibleCount(firstCount);
    setMounted(true);
    return () => setMounted(false);
  }, [device]);

  // 배너 이미지 파일명 생성 함수
  const getBannerFileName = (index: number): string => {
    const num = (index + 1).toString().padStart(2, '0');
    return `img_banner_${num}`;
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, TOTAL_IMAGES));
  };

  const modalContent = (
    <>
      <div
        className="fixed top-0 left-0 z-40 h-screen w-screen bg-transparent backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="pc:w-[57.75rem] tab:w-[39rem] max-h-auto fixed top-1/2 left-1/2 z-50 w-[19.625rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border-0 bg-[#242429] px-[3.25rem] py-[2.75rem]"
      >
        <div className="flex flex-col items-center gap-[2rem]">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">이미지 선택</h1>
            <h2 className="text-sm font-semibold text-gray-400">
              모임을 대표할 이미지를 선택해주세요!(필수)
            </h2>
          </div>

          <div className="pc:grid-cols-6 tab:grid-cols-4 pc:gap-[1.25rem] grid grid-cols-2 gap-[0.75rem]">
            {[...Array(visibleCount)].map((_, idx) => {
              const fileName = getBannerFileName(idx);
              const imageData = imgChange(fileName, 'banner');

              return (
                <div
                  key={idx}
                  className={`cursor-pointer overflow-hidden rounded-lg border-2 ${
                    selectedIndex === idx
                      ? 'border-[#9900FF]'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <Image
                    src={imageData}
                    alt={`모임 배너 ${idx + 1}`}
                    priority
                    width={120}
                    height={75}
                  />
                </div>
              );
            })}
          </div>
          {visibleCount < TOTAL_IMAGES && (
            <button
              type="button"
              className="text-sm font-semibold text-purple-600"
              onClick={handleShowMore}
            >
              더보기
            </button>
          )}
        </div>
        <div className="pc:absolute pc:top-[3.25rem] pc:right-[2.75rem] pc:mt-[0rem] mt-[1.3125rem] flex justify-center">
          <Button
            variant="solid"
            size="small"
            disabled={selectedIndex === null}
            onClick={() => {
              if (selectedIndex !== null) {
                const fileName = getBannerFileName(selectedIndex);
                onSubmit(fileName);
              }
            }}
          >
            완료
          </Button>
        </div>
      </div>
    </>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    modalContent,
    document.getElementById('modal-root') as HTMLElement,
  );
}

export default memo(ModalImgEdit);
