'use client';
import Button from '@/components/commons/Button';
import MemberList from './MemberList';
import { useState } from 'react';
import { GatheringDetailResponse, Participant } from '@/types/gathering';
import { useApproveParticipantMutation } from '@/hooks/queries/gatherings/useApproveParticipantMutation';
import { useRejectParticipantMutation } from '@/hooks/queries/gatherings/useRejectParticipantMutation';

interface MemberInfoSectionProps {
  approvedParticipants: Participant[];
  pendingParticipants: Participant[];
  gathering: GatheringDetailResponse;
}

export default function MemberInfoSection({
  gathering,
  approvedParticipants,
  pendingParticipants,
}: MemberInfoSectionProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const approveMutation = useApproveParticipantMutation();
  const rejectMutation = useRejectParticipantMutation();

  const handleAccept = async () => {
    await Promise.all(
      selectedIds.map((participantId) =>
        approveMutation.mutateAsync({
          gatheringId: gathering.id,
          participantId,
        }),
      ),
    );
    setSelectedIds([]);
  };

  const handleReject = async () => {
    await Promise.all(
      selectedIds.map((participantId) =>
        rejectMutation.mutateAsync({
          gatheringId: gathering.id,
          participantId,
        }),
      ),
    );
    setSelectedIds([]);
  };

  return (
    <>
      <section className="flex w-[60rem] flex-col gap-[40px] rounded-[0.5rem] bg-[#202024] p-[2.5rem]">
        {/* 모임 제목, 주최자 */}
        <div className="flex h-[4.375rem] flex-col justify-between">
          <h1 className="group-info-title">{gathering.name}</h1>
          <p className="group-info-subtitle">{gathering.creator.nickname}</p>
        </div>

        <div className="border-b-[0.0625rem] border-[#2D3035]" />
        <MemberList
          title="확정 멤버"
          members={approvedParticipants}
          isSelectable={false}
        />
        <MemberList
          title="신청 멤버"
          members={pendingParticipants}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          isSelectable={true}
        />
      </section>

      <div className="ml-[1.25rem] flex flex-col gap-[1.25rem]">
        <Button
          variant="solid"
          className="w-[22.75rem]"
          onClick={handleAccept}
          disabled={selectedIds.length === 0}
        >
          {selectedIds.length}명 수락
        </Button>
        <Button
          variant="outline"
          className="w-[22.75rem]"
          onClick={handleReject}
          disabled={selectedIds.length === 0}
        >
          {selectedIds.length}명 거절
        </Button>
      </div>
    </>
  );
}
