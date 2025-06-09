'use client';

import Image from 'next/image';
import GroupInfoSection from './GroupInfoSection';
import bannerImages from '@/constants/bannerImages';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import { useQueryTab } from '@/hooks/useQueryTab';
import MemberInfoSection from './MemberInfoSection';
import ParticipantsSection from './ParticipantsSection';
import { useParams } from 'next/navigation';
import { useGatheringDetailQuery } from '@/hooks/queries/gatherings/useGatheringsDetailQuery';
import { useUserStore } from '@/stores/useUserStore';
import { useGatheringParticipantsQuery } from '@/hooks/queries/gatherings/useGatheringsParticipantsQuery';
import { useState } from 'react';
import Button from '@/components/commons/Button';
import ParticipationForm from './ParticipationForm';

export default function GroupPage() {
  const { activeTab } = useQueryTab<'recruit' | 'members'>('tab', 'recruit', [
    'recruit',
    'members',
  ]);
  const user = useUserStore((state) => state.user);
  const { groupId } = useParams();
  const numericId = Number(groupId);
  const [showParticipationForm, setShowParticipationForm] = useState(false);

  const {
    data: gatheringDetailData,
    isLoading,
    error,
  } = useGatheringDetailQuery(numericId);

  const {
    data: participantsData,
    isLoading: isParticipantsLoading,
    error: participantsError,
  } = useGatheringParticipantsQuery(numericId);

  // TODO: 스켈레톤 적용
  if (isLoading || isParticipantsLoading) return <div>로딩 중...</div>;
  if (error || participantsError) return <div>에러 발생</div>;
  if (!gatheringDetailData || !participantsData)
    return <div>모임 정보를 찾을 수 없습니다.</div>;

  const isHost = user?.id === gatheringDetailData.creator.id;

  const participants = participantsData.participants;
  const approvedParticipants = participants.filter(
    (participant) => participant.status === 'APPROVED',
  );
  const pendingParticipants = participants.filter(
    (participant) => participant.status === 'PENDING',
  );

  const isParticipating = participants.some(
    (participant) => participant.userId === user?.id,
  );

  // TODO: 참여 취소 로직 추가
  const handleCanceleParticipation = () => {
    console.log('참여 취소');
  };

  const renderActionButtons = () => {
    if (showParticipationForm) {
      return <ParticipationForm gathering={gatheringDetailData} />;
    }

    if (isHost) return null;

    if (!isParticipating) {
      return (
        <Button
          variant="solid"
          className="w-[22.75rem]"
          onClick={() => setShowParticipationForm(true)}
        >
          함께하기
        </Button>
      );
    }

    return (
      <div>
        <Button variant="solid" disabled className="w-[22.75rem]">
          참여 완료
        </Button>
        <button
          className="mt-[1.125rem] w-full text-center text-[0.9375rem] font-medium text-[#BF5EFF] underline underline-offset-2"
          onClick={handleCanceleParticipation}
        >
          참여 취소
        </button>
      </div>
    );
  };

  return (
    <GroupPageLayout
      participantsNumber={approvedParticipants.length}
      banner={
        <div className="relative h-[22rem] w-full overflow-hidden rounded-[0.5rem]">
          <Image
            src={bannerImages[1]}
            alt="모임 배너"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      }
      actionButtons={renderActionButtons()}
    >
      {activeTab === 'recruit' ? (
        <GroupInfoSection gathering={gatheringDetailData} isHost={isHost} />
      ) : isHost ? (
        <MemberInfoSection
          gathering={gatheringDetailData}
          approvedParticipants={approvedParticipants}
          pendingParticipants={pendingParticipants}
        />
      ) : (
        <ParticipantsSection
          gathering={gatheringDetailData}
          participants={approvedParticipants}
        />
      )}
    </GroupPageLayout>
  );
}
