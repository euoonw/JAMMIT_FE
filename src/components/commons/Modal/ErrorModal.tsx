'use client';

import ModalInteraction from './ModalInteraction';
import { useRouter } from 'next/navigation';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  const router = useRouter();

  const loginErrorMessages = [
    '로그인이 필요한 서비스입니다.',
    '세션이 만료되었습니다. 다시 로그인 해주세요.',
  ];

  const handleConfirm = () => {
    if (loginErrorMessages.includes(message)) {
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
