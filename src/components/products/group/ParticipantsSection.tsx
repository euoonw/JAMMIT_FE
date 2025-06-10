'use client';
import Image from 'next/image';
import DefaultProfile from '@/assets/icons/ic_default_profile.svg';
import Button from '@/components/commons/Button';
import { GatheringDetailResponse, Participant } from '@/types/gathering';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import clsx from 'clsx';
import { useState } from 'react';
import ModalReview from '@/components/commons/Modal/ModalReview';
import { ReviewField, tagToFieldMap } from '@/constants/review';
import { usePostReviewMutation } from '@/hooks/queries/review/usePostReviewMutation';
import { useUserStore } from '@/stores/useUserStore';

interface ParticipantsSectionProps {
  gathering: GatheringDetailResponse;
  participants: Participant[];
}

export default function ParticipantsSection({
  gathering,
  participants,
}: ParticipantsSectionProps) {
  const user = useUserStore((state) => state.user);
  const profileImageUrl = null;

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

    reviewMutation.mutate(reviewData);
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
        // TODO: API 수정되면 프로필 이미지 설정 추가
        ({
          participantId,
          userNickname,
          bandSession,
          introduction,
          userId,
        }) => (
          <div key={participantId}>
            <div className="my-[0.75rem] flex items-center gap-[1.25rem]">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="프로필 사진"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <DefaultProfile
                  alt="기본 프로필 사진"
                  width="3rem"
                  height="3rem"
                />
              )}

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
              {isCompleted && user?.id !== userId && isParticipating && (
                <Button
                  className="w-[124px]"
                  onClick={() => handleOpenReviewModal(userId, userNickname)}
                >
                  리뷰 쓰기
                </Button>
              )}
            </div>
            <div className="border-b-[0.0625rem] border-[#2D3035]" />
          </div>
        ),
      )}
      {selectedParticipant && (
        <ModalReview
          onCancel={handleCloseReviewModal}
          onSubmit={handleSubmitReview}
          revieweeNickname={selectedParticipant.nickname}
        />
      )}
    </section>
  );
}
