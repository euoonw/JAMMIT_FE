import { GatheringDetailResponse, Participant } from '@/types/gathering';
import Button from '@/components/commons/Button';
import ParticipationForm from './ParticipationForm';

interface RenderActionButtonsProps {
  gathering: GatheringDetailResponse;
  isHost: boolean;
  userId: number | null;
  participants: Participant[];
  showParticipationForm: boolean;
  onCancel: (participantId: number) => void;
  onJoin: () => void;
  onSubmitParticipation: (args: {
    session: string;
    introduction: string;
  }) => void;
}

export default function RenderActionButtons({
  gathering,
  isHost,
  userId,
  participants,
  showParticipationForm,
  onCancel,
  onJoin,
  onSubmitParticipation,
}: RenderActionButtonsProps) {
  const status = gathering.status;
  const myParticipant = participants.find((p) => p.userId === userId);
  const myStatus = myParticipant?.status ?? null;
  const myId = myParticipant?.participantId;

  const isParticipating = participants.some(
    (p) =>
      p.userId === userId &&
      (p.status === 'PENDING' || p.status === 'APPROVED'),
  );

  if (status === 'CANCELED') {
    return (
      <Button disabled className="pc:w-[22.75rem] w-full">
        취소된 모임입니다
      </Button>
    );
  }

  if (status === 'COMPLETED') {
    if (myStatus === 'REJECTED') {
      return (
        <Button disabled className="pc:w-[22.75rem] w-full">
          신청 거절된 모임입니다
        </Button>
      );
    }
    return (
      <Button disabled className="pc:w-[22.75rem] w-full">
        완료된 모임입니다
      </Button>
    );
  }

  if (status === 'CONFIRMED') {
    if (myStatus === 'REJECTED' || myStatus === 'PENDING') {
      return (
        <Button disabled className="pc:w-[22.75rem] w-full">
          신청 거절된 모임입니다
        </Button>
      );
    }
    if (myStatus === 'APPROVED') {
      return (
        <Button disabled className="pc:w-[22.75rem] w-full">
          참여 예정인 모임입니다
        </Button>
      );
    }
    if (isHost) {
      return (
        <Button disabled className="pc:w-[22.75rem] w-full">
          개설 확정된 모임입니다
        </Button>
      );
    }
    return (
      <Button disabled className="pc:w-[22.75rem] w-full">
        모집 마감된 모임입니다
      </Button>
    );
  }

  if (status === 'RECRUITING') {
    if (isHost) {
      return;
    }
    if (myStatus === 'REJECTED') {
      return (
        <Button disabled className="pc:w-[22.75rem] w-full">
          신청 거절된 모임입니다
        </Button>
      );
    }
    if (isParticipating) {
      return (
        <div className="pc:w-[22.75rem] w-full">
          <Button disabled className="w-full">
            참여 완료
          </Button>
          <button
            className="mt-[1.125rem] w-full text-center text-[0.9375rem] font-medium text-[#BF5EFF] underline underline-offset-2"
            onClick={() => myId && onCancel(myId)}
          >
            참여 취소
          </button>
        </div>
      );
    }
    if (showParticipationForm) {
      return (
        <ParticipationForm
          gathering={gathering}
          onComplete={onSubmitParticipation}
        />
      );
    }
    return (
      <Button
        variant="solid"
        className="pc:w-[22.75rem] w-full"
        onClick={onJoin}
        disabled={!userId}
      >
        함께하기
      </Button>
    );
  }

  return null;
}
