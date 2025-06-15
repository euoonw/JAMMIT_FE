'use client';

import Button from '@/components/commons/Button';
import { GatheringDetailResponse, Participant } from '@/types/gathering';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import clsx from 'clsx';
import { useState } from 'react';
import ModalReview from '@/components/commons/Modal/ModalReview';
import { ReviewField, tagToFieldMap } from '@/constants/review';
import { usePostReviewMutation } from '@/hooks/queries/review/usePostReviewMutation';
import { useUserStore } from '@/stores/useUserStore';
import ProfileImage from '@/components/commons/ProfileImage';
import { ReviewItem } from '@/types/review';
import ModalInteraction from '@/components/commons/Modal/ModalInteraction';

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
      {participants.map(
        ({
          participantId,
          userNickname,
          bandSession,
          introduction,
          userId,
          profileImagePath,
        }) => {
          const hasWrittenReview = writtenReviews?.some(
            (review) =>
              review.revieweeId === userId &&
              review.gatheringId === gathering.id,
          );

          return (
            <div key={participantId}>
              <div className="my-[0.75rem] flex items-center gap-[1.25rem]">
                <ProfileImage src={profileImagePath} size={3} />

                <div className="w-[8.6875rem] underline underline-offset-2">
                  {userNickname}
                </div>

                <div className="flex w-[10.4375rem] gap-[0.25rem]">
                  <div className="rounded-[0.5rem] bg-[#34343A] px-[0.75rem] py-[0.375rem] text-gray-100">
                    {SESSION_ENUM_TO_KR[bandSession]}
                  </div>
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
