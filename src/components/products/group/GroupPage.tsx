'use client';

import Button from '@/components/commons/Button';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import { SESSION_KR_TO_ENUM } from '@/constants/tagsMapping';
import { useCancelParticipateGatheringMutation } from '@/hooks/queries/gatherings/useCancelParticipateGathering';
import { useGatheringDetailQuery } from '@/hooks/queries/gatherings/useGatheringsDetailQuery';
import { useGatheringParticipantsQuery } from '@/hooks/queries/gatherings/useGatheringsParticipantsQuery';
import { useParticipateGatheringMutation } from '@/hooks/queries/gatherings/useParticipateGatheringsMutation';
import { useWrittenReviewsQuery } from '@/hooks/queries/review/useWrittenReviewsQuery';
import { useQueryTab } from '@/hooks/useQueryTab';
import { useUserStore } from '@/stores/useUserStore';
import { imgChange } from '@/utils/imgChange';
import { useSentryErrorLogger } from '@/utils/useSentryErrorLogger';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GroupInfoSection from './GroupInfoSection';
import MemberInfoSection from './MemberInfoSection';
import ParticipantsSection from './ParticipantsSection';
import ParticipationForm from './ParticipationForm';
import ModalInteraction from '@/components/commons/Modal/ModalInteraction';
import GroupPageSkeleton from './GroupPageSkeleton';

export default function GroupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { activeTab } = useQueryTab<'recruit' | 'members'>('tab', 'recruit', [
    'recruit',
    'members',
  ]);
  const { user, isLoaded, isRefreshing } = useUserStore();
  const isGatheringParticipantsQueryReady = isLoaded && !isRefreshing && !!user;

  const { groupId } = useParams();
  const numericId = Number(groupId);
  const [showParticipationForm, setShowParticipationForm] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (activeTab === 'members' && !user) {
      setLoginModalOpen(true);
    }
  }, [activeTab, user, router, searchParams, isLoaded]);

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
    enabled: isGatheringParticipantsQueryReady,
  });

  const isWrittenReviewsQueryReady = isGatheringParticipantsQueryReady;

  const {
    data: writtenReviewsData,
    isLoading: isWrittenReviewLoading,
    error: wittenReviewError,
  } = useWrittenReviewsQuery({
    enabled: isWrittenReviewsQueryReady,
  });

  const participateMutation = useParticipateGatheringMutation();
  const cancelMutation = useCancelParticipateGatheringMutation();
  // 에러로깅
  useSentryErrorLogger({
    isError: !!error,
    error,
    tags: { section: 'gather', action: 'fetch_detail' },
    extra: { gatheringId: numericId },
  });

  useSentryErrorLogger({
    isError: !!participantsError,
    error: participantsError,
    tags: { section: 'gather', action: 'fetch_participants' },
    extra: { gatheringId: numericId },
  });

  useSentryErrorLogger({
    isError: !!wittenReviewError,
    error: wittenReviewError,
    tags: { section: 'gather', action: 'fetch_written_reviews' },
    extra: { gatheringId: numericId },
  });

  if (isLoading) {
    return <GroupPageSkeleton />;
  }
  if (error) return <div>에러 발생</div>;
  if (!gatheringDetailData) return <div>모임 정보를 찾을 수 없습니다.</div>;

  if (activeTab === 'members') {
    if (!user) {
    } else {
      if (isParticipantsLoading || isWrittenReviewLoading)
        return <div>로딩 중...</div>;

      if (participantsError || wittenReviewError) return <div>에러 발생</div>;

      if (!participantsData)
        return <div>모임 참가자 정보를 찾을 수 없습니다.</div>;
    }
  }

  const isHost = user?.id === gatheringDetailData.creator.id;

  const isRecruiting = gatheringDetailData.status === 'RECRUITING';
  const isCanceled = gatheringDetailData.status === 'CANCELED';
  const isCompleted = gatheringDetailData.status === 'COMPLETED';
  const isConfirmed = gatheringDetailData.status === 'CONFIRMED';

  const participants = participantsData?.participants ?? [];

  const myParticipant = participants.find(
    (participant) => participant.userId === user?.id,
  );
  const myParticipantStatus = myParticipant?.status ?? null;
  const isMyParticipantPending = myParticipantStatus === 'PENDING';
  const isMyParticipantApproved = myParticipantStatus === 'APPROVED';
  const isMyParticipantRejected = myParticipantStatus === 'REJECTED';
  const myParticipantId = myParticipant?.participantId;

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

  type ButtonState =
    | 'CANCELED'
    | 'COMPLETED'
    | 'COMPLETED_REJECTED'
    | 'CONFIRMED_REJECTED'
    | 'CONFIRMED_APPROVED'
    | 'CONFIRMED_HOST'
    | 'CONFIRMED_DEFAULT'
    | 'RECRUITING_HOST'
    | 'RECRUITING_PARTICIPATING'
    | 'RECRUITING_FORM'
    | 'RECRUITING_JOIN'
    | 'RECRUITING_REJECTED';

  let buttonState: ButtonState;

  if (isCanceled) {
    buttonState = 'CANCELED';
  } else if (isCompleted) {
    if (isMyParticipantRejected) {
      buttonState = 'COMPLETED_REJECTED';
    } else {
      buttonState = 'COMPLETED';
    }
  } else if (isConfirmed) {
    if (isMyParticipantRejected || isMyParticipantPending) {
      buttonState = 'CONFIRMED_REJECTED';
    } else if (isMyParticipantApproved) {
      buttonState = 'CONFIRMED_APPROVED';
    } else if (isHost) {
      buttonState = 'CONFIRMED_HOST';
    } else {
      buttonState = 'CONFIRMED_DEFAULT';
    }
  } else if (isRecruiting) {
    if (isHost) {
      buttonState = 'RECRUITING_HOST';
    } else if (isMyParticipantRejected) {
      buttonState = 'RECRUITING_REJECTED';
    } else if (isParticipating) {
      buttonState = 'RECRUITING_PARTICIPATING';
    } else if (showParticipationForm) {
      buttonState = 'RECRUITING_FORM';
    } else {
      buttonState = 'RECRUITING_JOIN';
    }
  }

  const renderActionButtons = () => {
    switch (buttonState) {
      case 'CANCELED':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            취소된 모임입니다
          </Button>
        );
      case 'COMPLETED':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            완료된 모임입니다
          </Button>
        );
      case 'COMPLETED_REJECTED':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            신청 거절된 모임입니다
          </Button>
        );
      case 'CONFIRMED_REJECTED':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            신청 거절된 모임입니다
          </Button>
        );
      case 'CONFIRMED_APPROVED':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            참여 예정인 모임입니다
          </Button>
        );
      case 'CONFIRMED_HOST':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            개설 확정된 모임입니다
          </Button>
        );
      case 'CONFIRMED_DEFAULT':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            모집 마감된 모임입니다
          </Button>
        );
      case 'RECRUITING_PARTICIPATING':
        return (
          <div className="pc:w-[22.75rem] w-full">
            <Button disabled className="w-full">
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
      case 'RECRUITING_REJECTED':
        return (
          <Button disabled className="pc:w-[22.75rem] w-full">
            신청 거절된 모임입니다
          </Button>
        );
      case 'RECRUITING_FORM':
        return (
          <ParticipationForm
            gathering={gatheringDetailData}
            onComplete={handleSubmitParticipation}
          />
        );
      case 'RECRUITING_JOIN':
        return (
          <Button
            variant="solid"
            className="pc:w-[22.75rem] w-full"
            onClick={() => setShowParticipationForm(true)}
            disabled={!user}
          >
            함께하기
          </Button>
        );
      default:
        return null;
    }
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    router.push('/login');
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', 'recruit');
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <>
      <GroupPageLayout
        participantsNumber={
          isCompleted
            ? completedParticipants.length + 1
            : approvedParticipants.length + 1
        }
        banner={
          <div className="pc:rounded-[0.5rem] relative h-[22rem] w-full overflow-hidden">
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
            writtenReviews={writtenReviewsData}
            gathering={gatheringDetailData}
            participants={
              isCompleted ? completedParticipants : approvedParticipants
            }
          />
        )}
      </GroupPageLayout>
      {loginModalOpen && (
        <ModalInteraction
          message="로그인 후 이용 가능한 기능입니다."
          onConfirm={handleLoginModalClose}
          onClose={handleLoginModalClose}
          isShowCancel={false}
        />
      )}
    </>
  );
}
