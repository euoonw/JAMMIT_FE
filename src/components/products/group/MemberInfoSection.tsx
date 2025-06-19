'use client';
import Button from '@/components/commons/Button';
import { useApproveParticipantMutation } from '@/hooks/queries/gatherings/useApproveParticipantMutation';
import { useRejectParticipantMutation } from '@/hooks/queries/gatherings/useRejectParticipantMutation';
import { GatheringDetailResponse, Participant } from '@/types/gathering';
import { useState } from 'react';
import MemberList from './MemberList';

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
  const isRecruiting = gathering.status === 'RECRUITING';
  const handleAccept = async () => {
    for (const participantId of selectedIds) {
      await approveMutation.mutateAsync({
        gatheringId: gathering.id,
        participantId,
      });
    }
    setSelectedIds([]);
  };

  const handleReject = async () => {
    for (const participantId of selectedIds) {
      await rejectMutation.mutateAsync({
        gatheringId: gathering.id,
        participantId,
      });
    }
    setSelectedIds([]);
  };

  return (
    <>
      <section className="pc:w-[60rem] tab:p-[2.5rem] flex w-full flex-col gap-[40px] rounded-[0.5rem] bg-[#202024] p-[1.25rem]">
        {/* 모임 제목, 주최자 */}
        <div className="flex flex-col justify-between gap-[0.625rem]">
          <h1 className="group-info-title">{gathering.name}</h1>
          <p className="group-info-subtitle">{gathering.creator.nickname}</p>
        </div>

        <div className="border-b-[0.0625rem] border-[#2D3035]" />
        <MemberList
          title="확정 멤버"
          members={approvedParticipants}
          isSelectable={false}
          gatheringId={gathering.id}
        />
        <MemberList
          title="신청 멤버"
          members={pendingParticipants}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          isSelectable={true}
          gatheringId={gathering.id}
        />
      </section>

      {isRecruiting && (
        <div className="ml-[1.25rem] flex flex-col gap-[1.25rem]">
          <Button
            variant="solid"
            className="pc:w-[22.75rem] w-full"
            onClick={handleAccept}
            disabled={selectedIds.length === 0}
          >
            {selectedIds.length}명 수락
          </Button>
          <Button
            variant="outline"
            className="pc:w-[22.75rem] w-full"
            onClick={handleReject}
            disabled={selectedIds.length === 0}
          >
            {selectedIds.length}명 거절
          </Button>
        </div>
      )}
    </>
  );
}
