import EditIcon from '@/assets/icons/ic_edit.svg';
import ProfileImage from '@/components/commons/ProfileImage';
import { GENRE_ENUM_TO_KR, SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { BandSession, Genre } from '@/types/tags';
import { UserResponse } from '@/types/user';
import React from 'react';

interface UserCardprops {
  user: UserResponse;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
}

export default function UserCardItem({
  user,
  setIsModalOpen,
  type = 'mypage',
}: UserCardprops) {
  const handleProfileEdit = () => {
    setIsModalOpen?.(true);
  };
  return (
    <div className="flex h-[15.625rem] w-[full] items-center justify-center gap-[3.3125rem] bg-[#36114E]">
      <div>
        <ProfileImage src={user.profileImagePath} size={8} />
      </div>
      <div className="flex flex-col text-gray-100">
        <div className="flex items-center gap-[0.625rem]">
          <p className="text-[1.5rem] leading-[2.4rem] font-bold">
            {user.username}
          </p>
          {type !== 'review' && (
            <button
              type="submit"
              onClick={handleProfileEdit}
              aria-label="수정 버튼"
            >
              <EditIcon width={18} height={18} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-[0.5rem] text-sm font-medium">
          <p>담당 세션</p>
          {user.preferredBandSessions.map((session: BandSession) => (
            <div
              key={session}
              className="h-[2rem] rounded-lg bg-[#34343A] px-[0.75rem] py-[0.375rem]"
            >
              {SESSION_ENUM_TO_KR[session]}
            </div>
          ))}
          <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
          <p>선호 장르</p>
          {user.preferredGenres.map((genre: Genre) => (
            <div
              key={genre}
              className="h-[2rem] rounded-lg bg-[#34343A] px-[0.75rem] py-[0.375rem]"
            >
              {GENRE_ENUM_TO_KR[genre]}
            </div>
          ))}
          <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
          <p>개설모임수</p>
          <p>{user.totalCreatedGatheringCount}</p>
          <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
          <p>작성글수</p>
          <p>{user.completedGatheringCount}</p>
        </div>
      </div>
    </div>
  );
}
