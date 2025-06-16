'use client';

import { memo, ReactNode, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { usePreventScroll } from '@/hooks/usePreventScroll';
import CancelIcon from '@/assets/icons/ic_x.svg';

interface ModalWrapperProps {
  /** 모달 상단 제목 텍스트 */
  title?: string;
  /** 모달 내부에 렌더링될 내용 */
  children: ReactNode;
  /** "x"버튼 또는 "취소" 버튼 클릭 시 실행할 콜백 */
  onClose: () => void;
  /** 모달 콘텐츠 영역에 적용할 추가 스타일 클래스 */
  className?: string;
}

function ModalWrapper({
  title,
  children,
  onClose,
  className,
}: ModalWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useClickOutside(modalRef, onClose);
  usePreventScroll();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div ref={modalRef} className={className}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="모달 닫기"
        >
          <CancelIcon />
        </button>
        {title && (
          <h2 className="mb-[2rem] text-lg font-semibold text-gray-100">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    modalContent,
    document.getElementById('modal-root') as HTMLElement,
  );
}

export default memo(ModalWrapper);
