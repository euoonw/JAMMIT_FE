'use client';

import Image from 'next/image';
import GroupInfoSection from './GroupInfoSection';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import { useQueryTab } from '@/hooks/useQueryTab';
import MemberInfoSection from './MemberInfoSection';
import ParticipantsSection from './ParticipantsSection';
import { useParams, useSearchParams } from 'next/navigation';
import { useGatheringDetailQuery } from '@/hooks/queries/gatherings/useGatheringsDetailQuery';
import { useUserStore } from '@/stores/useUserStore';
import { useGatheringParticipantsQuery } from '@/hooks/queries/gatherings/useGatheringsParticipantsQuery';
import { useEffect, useState } from 'react';
import Button from '@/components/commons/Button';
import ParticipationForm from './ParticipationForm';
import { useParticipateGatheringMutation } from '@/hooks/queries/gatherings/useParticipateGatheringsMutation';
import { SESSION_KR_TO_ENUM } from '@/constants/tagsMapping';
import { useCancelParticipateGatheringMutation } from '@/hooks/queries/gatherings/useCancelParticipateGathering';
import { imgChange } from '@/utils/imgChange';
import { useRouter } from 'next/navigation';

export default function GroupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { activeTab } = useQueryTab<'recruit' | 'members'>('tab', 'recruit', [
    'recruit',
    'members',
  ]);
  const user = useUserStore((state) => state.user);
  const { groupId } = useParams();
  const numericId = Number(groupId);
  const [showParticipationForm, setShowParticipationForm] = useState(false);

  useEffect(() => {
    if (activeTab === 'members' && !user) {
      alert('로그인 후 이용 가능한 기능입니다.');
      router.push('/login');
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('tab', 'recruit');
      router.replace(`?${newParams.toString()}`);
    }
  }, [activeTab, user, router, searchParams]);

  const {
    data: gatheringDetailData,
    isLoading,
    error,
  } = useGatheringDetailQuery(numericId);

  const {
    data: participantsData,
    isLoading: isParticipantsLoading,
    error: participantsError,
  } = useGatheringParticipantsQuery(numericId, {
    enabled: !!user,
  });

  const participateMutation = useParticipateGatheringMutation();
  const cancelMutation = useCancelParticipateGatheringMutation();

  // TODO: 스켈레톤 적용
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!gatheringDetailData) return <div>모임 정보를 찾을 수 없습니다.</div>;

  if (activeTab === 'members' && user && isParticipantsLoading)
    return <div>로딩 중...</div>;
  if (activeTab === 'members' && user && participantsError)
    return <div>에러 발생</div>;
  if (activeTab === 'members' && user && !participantsData)
    return <div>모임 정보를 찾을 수 없습니다.</div>;

  const isHost = user?.id === gatheringDetailData.creator.id;
  const isCanceled = gatheringDetailData.status === 'CANCELED';
  const isCompleted = gatheringDetailData.status === 'COMPLETED';
  const isConfirmed = gatheringDetailData.status === 'CONFIRMED';

  const participants = participantsData?.participants ?? [];

  const approvedParticipants = participants.filter(
    (participant) => participant.status === 'APPROVED',
  );
  const pendingParticipants = participants.filter(
    (participant) => participant.status === 'PENDING',
  );
  const completedParticipants = participants.filter(
    (participant) => participant.status === 'COMPLETED',
  );

  const isParticipating =
    pendingParticipants.some(
      (participant) => participant.userId === user?.id,
    ) ||
    approvedParticipants.some((participant) => participant.userId === user?.id);
  const currentUserParticipation = pendingParticipants.find(
    (participant) => participant.userId === user?.id,
  );

  const myParticipantId = currentUserParticipation?.participantId;

  const handleCanceleParticipation = () => {
    if (!myParticipantId) {
      console.warn('참여 정보를 찾을 수 없습니다.');
      return;
    }
    cancelMutation.mutate({
      gatheringId: numericId,
      participantId: myParticipantId,
    });
  };

  const handleSubmitParticipation = ({
    session,
    introduction,
  }: {
    session: string;
    introduction: string;
  }) => {
    const sessionEnum = SESSION_KR_TO_ENUM[session];

    participateMutation.mutate({
      id: numericId,
      bandSession: sessionEnum,
      introduction,
    });

    setShowParticipationForm(false);
  };

  const renderActionButtons = () => {
    if (isCanceled) {
      return (
        <Button variant="solid" disabled className="w-[22.75rem]">
          취소된 모임입니다
        </Button>
      );
    }

    if (isCompleted || isConfirmed) {
      return (
        <Button variant="solid" disabled className="w-[22.75rem]">
          모집 마감
        </Button>
      );
    }

    if (showParticipationForm) {
      return (
        <ParticipationForm
          gathering={gatheringDetailData}
          onComplete={handleSubmitParticipation}
        />
      );
    }

    if (isHost) return null;

    if (!isParticipating) {
      return (
        <Button
          variant="solid"
          className="w-[22.75rem]"
          onClick={() => setShowParticipationForm(true)}
          disabled={!user}
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
      participantsNumber={
        isCompleted ? completedParticipants.length : approvedParticipants.length
      }
      banner={
        <div className="relative h-[22rem] w-full overflow-hidden rounded-[0.5rem]">
          <Image
            src={imgChange(gatheringDetailData.thumbnail, 'banner')}
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
      ) : isHost && !isCompleted ? (
        <MemberInfoSection
          gathering={gatheringDetailData}
          approvedParticipants={approvedParticipants}
          pendingParticipants={pendingParticipants}
        />
      ) : (
        <ParticipantsSection
          gathering={gatheringDetailData}
          participants={
            isCompleted ? completedParticipants : approvedParticipants
          }
        />
      )}
    </GroupPageLayout>
  );
}
