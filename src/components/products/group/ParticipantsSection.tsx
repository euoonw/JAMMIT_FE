'use client';

import Button from '@/components/commons/Button';
import ModalInteraction from '@/components/commons/Modal/ModalInteraction';
import ModalReview from '@/components/commons/Modal/ModalReview';
import ProfileImage from '@/components/commons/ProfileImage';
import { ReviewField, tagToFieldMap } from '@/constants/review';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { usePostReviewMutation } from '@/hooks/queries/review/usePostReviewMutation';
import { useUserStore } from '@/stores/useUserStore';
import { GatheringDetailResponse, Participant } from '@/types/gathering';
import { ReviewItem } from '@/types/review';
import { handleAuthApiError } from '@/utils/authApiError';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface ParticipantsSectionProps {
  gathering: GatheringDetailResponse;
  participants: Participant[];
  writtenReviews: ReviewItem[] | undefined;
}

export default function ParticipantsSection({
  gathering,
  participants,
  writtenReviews,
}: ParticipantsSectionProps) {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const isHost = user?.id === gathering.creator.id;

  const isParticipating = participants.some(
    (participant) => participant.userId === user?.id,
  );

  const isCompleted = gathering.status === 'COMPLETED';
  const [selectedParticipant, setSelectedParticipant] = useState<{
    userId: number;
    nickname: string;
  } | null>(null);
  const reviewMutation = usePostReviewMutation();

  const participantsWithHost: Participant[] = [
    {
      participantId: -1, // 임의의 숫자
      userId: gathering.creator.id,
      userNickname: gathering.creator.nickname,
      userEmail: 'host@example.com', // 임의 이메일
      bandSession: 'VOCAL', // 임의 세션
      status: 'COMPLETED',
      createdAt: new Date().toISOString(), // 임의 시간 (현재 시간)
      introduction: '',
      profileImagePath: '',
    },
    ...participants,
  ];

  const handleOpenReviewModal = (userId: number, nickname: string) => {
    setSelectedParticipant({ userId, nickname });
  };

  const handleCloseReviewModal = () => {
    setSelectedParticipant(null);
  };

  const handleSubmitReview = (formData: { review: string; tags: string[] }) => {
    if (!selectedParticipant) return;

    const tagFields = Object.entries(tagToFieldMap).reduce(
      (acc, [tag, field]) => {
        acc[field] = formData.tags.includes(tag);
        return acc;
      },
      {} as Record<ReviewField, boolean>,
    );

    const reviewData = {
      revieweeId: selectedParticipant.userId,
      gatheringId: gathering.id,
      content: formData.review,
      ...tagFields,
    };

    reviewMutation.mutate(reviewData, {
      onSuccess: () => {
        handleCloseReviewModal();
        setSuccessModalOpen(true);
      },
      onError: (error) => {
        handleAuthApiError(error, '리뷰 작성 중 오류가 발생했습니다.', {
          section: 'review',
          action: 'create_review',
        });
      },
    });
    handleCloseReviewModal();
  };

  return (
    <section className="w-[60rem] rounded-[0.5rem] bg-[#202024] p-[2.5rem]">
      <div className="flex h-[4.375rem] flex-col justify-between">
        <h1 className="group-info-title">{gathering.name}</h1>
        <p className="group-info-subtitle">{gathering.creator.nickname}</p>
      </div>

      <div className="group-info-divider-line" />
      {participantsWithHost.map(
        (
          {
            participantId,
            userNickname,
            bandSession,
            introduction,
            userId,
            profileImagePath,
          },
          index,
        ) => {
          const hasWrittenReview = writtenReviews?.some(
            (review) =>
              review.revieweeId === userId &&
              review.gatheringId === gathering.id,
          );
          const isHostItem = index === 0;

          return (
            <div key={participantId}>
              <div className="my-[0.75rem] flex items-center gap-[1.25rem]">
                <ProfileImage src={profileImagePath} size={3} />

                <div className="flex w-[8.6875rem] items-center">
                  <span className="text-[1rem] underline underline-offset-2">
                    {userNickname}
                  </span>
                  {isHostItem && (
                    <div className="ml-[0.4375rem] flex h-[1rem] w-[2.875rem] items-center justify-center rounded-[0.5313rem] bg-purple-700 text-center text-[0.75rem] font-semibold">
                      주최자
                    </div>
                  )}
                </div>

                <div className="flex w-[10.4375rem] gap-[0.25rem]">
                  {!isHostItem && (
                    <div className="rounded-[0.5rem] bg-[#34343A] px-[0.75rem] py-[0.375rem] text-gray-100">
                      {SESSION_ENUM_TO_KR[bandSession]}
                    </div>
                  )}
                </div>

                <div
                  className={clsx(
                    'line-clamp-2 overflow-hidden text-ellipsis',
                    isCompleted ? 'w-[20.375rem]' : 'w-[29.375rem]',
                  )}
                >
                  {introduction}
                </div>

                {isCompleted &&
                  user?.id !== userId &&
                  (isParticipating || isHost) &&
                  (hasWrittenReview ? (
                    <Button disabled className="w-[124px]">
                      리뷰 작성 완료
                    </Button>
                  ) : (
                    <Button
                      className="w-[124px]"
                      onClick={() =>
                        handleOpenReviewModal(userId, userNickname)
                      }
                    >
                      리뷰 쓰기
                    </Button>
                  ))}
              </div>
              <div className="border-b-[0.0625rem] border-[#2D3035]" />
            </div>
          );
        },
      )}
      {participants.length === 0 && (
        <div className="mt-[2.5rem] flex w-full flex-col items-center justify-center">
          <Image
            src="/images/img_character01.png"
            alt="링크 공유 캐릭터 이미지"
            width={128}
            height={128}
          />
          <div className="h-[1.5rem] w-full pt-[0.5rem] text-center text-gray-400">
            아직 참여 멤버가 없어요~
          </div>
        </div>
      )}
      {selectedParticipant && (
        <ModalReview
          onCancel={handleCloseReviewModal}
          onSubmit={handleSubmitReview}
          revieweeNickname={selectedParticipant.nickname}
        />
      )}
      {successModalOpen && (
        <ModalInteraction
          message="리뷰가 작성되었습니다!"
          onConfirm={() => setSuccessModalOpen(false)}
          onClose={() => setSuccessModalOpen(false)}
          isShowCancel={false}
        />
      )}
    </section>
  );
}
