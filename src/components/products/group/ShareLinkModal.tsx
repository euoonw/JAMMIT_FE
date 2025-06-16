'use client';
import Button from '@/components/commons/Button';
import ModalWrapper from '@/components/commons/Modal/ModalWrapper';
import Image from 'next/image';
import { useState } from 'react';

interface ShareLinkModalProps {
  inviteLink: string;
  onClose: () => void;
}

export default function ShareLinkModal({
  inviteLink,
  onClose,
}: ShareLinkModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      className="relative w-[30.5rem] rounded-[1.5rem] bg-[#242429] p-[3.25rem]"
    >
      <div className="flex flex-col items-center">
        <Image
          src="/images/img_character01.png"
          alt="링크 공유 캐릭터 이미지"
          width={128}
          height={128}
        />
        <div className="mt-[0.5rem] text-center">
          <p className="text-[1.5rem] font-semibold">
            이제 합주를 소문내보세요!
          </p>
          <p className="mt-[0.5rem] text-sm font-semibold text-gray-400">
            아래 링크를 복사해서 합주를 알려보세요.
          </p>
        </div>

        <div className="mt-[1.375rem] flex w-full items-center rounded-[0.5rem] bg-[#34343a] p-[1rem] pl-[1.5rem]">
          <p className="w-[10.4375rem] flex-1 truncate bg-transparent text-[1rem]">
            {inviteLink}
          </p>
          <Button
            variant="solid"
            size="small"
            className="ml-5"
            onClick={handleCopy}
          >
            {copied ? '복사됨' : '복사'}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
