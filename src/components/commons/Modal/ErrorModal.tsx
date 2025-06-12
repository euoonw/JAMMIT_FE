'use client';

import ModalInteraction from './ModalInteraction';
import { useRouter } from 'next/navigation';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    if (message === '로그인이 필요한 서비스입니다.') {
      router.push('/login');
    }
    onClose();
  };

  return (
    <ModalInteraction
      message={message}
      onConfirm={handleConfirm}
      onClose={onClose}
      isShowCancel={false}
    />
  );
}
