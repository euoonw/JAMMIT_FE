'use client';
import { useErrorModalStore } from '@/stores/useErrorModalStore';
import ErrorModal from '@/components/commons/Modal/ErrorModal';

export default function GlobalErrorModalProvider() {
  const { message, isOpen, close } = useErrorModalStore();
  if (!isOpen) {
    return null;
  }

  return <ErrorModal message={message} onClose={close} />;
}
