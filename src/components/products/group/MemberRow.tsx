'use client';
import Image from 'next/image';

import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import DefaultProfile from '@/assets/icons/ic_default_profile.svg';
import { useMemo } from 'react';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';

interface MemberRowProps {
  id: number;
  selected: boolean;
  onSelectChange: (id: number) => void;
  nickname: string;
  session: string;
  introduction: string;
  profileImage?: File | null;
  isSelectable?: boolean;
}

export default function MemberRow({
  id,
  selected,
  onSelectChange,
  nickname,
  session,
  introduction,
  profileImage = null,
  isSelectable = true,
}: MemberRowProps) {
  const profileImageUrl = useMemo(() => {
    return profileImage ? URL.createObjectURL(profileImage) : null;
  }, [profileImage]);

  return (
    <div>
      <div className="my-[0.75rem] flex items-center gap-[1.25rem] px-[1.0625rem]">
        {isSelectable ? (
          <div onClick={() => onSelectChange(id)} className="cursor-pointer">
            {selected ? <Checkbox /> : <CheckboxEmpty />}
          </div>
        ) : (
          <div className="w-[1rem]" />
        )}
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt="프로필 사진"
            width={48}
            height={48}
          />
        ) : (
          <DefaultProfile alt="기본 프로필 사진" width="3rem" height="3rem" />
        )}

        <div className="w-[8.6875rem] underline underline-offset-2">
          {nickname}
        </div>

        <div className="flex w-[10.4375rem] gap-[0.25rem]">
          <div className="rounded-[0.5rem] bg-[#34343A] px-[0.75rem] py-[0.375rem] text-gray-100">
            {SESSION_ENUM_TO_KR[session]}
          </div>
        </div>
        <div className="line-clamp-2 w-[22.875rem] overflow-hidden text-ellipsis">
          {introduction}
        </div>
      </div>
      <div className="border-b-[0.0625rem] border-[#2D3035]" />
    </div>
  );
}
