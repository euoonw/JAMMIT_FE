import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import MemberRow from './MemberRow';
import { Participant } from '@/types/gathering';

interface MemberListProps {
  title: string;
  members: Participant[];
  isSelectable?: boolean;
  selectedIds?: number[];
  setSelectedIds?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function MemberList({
  title,
  members,
  isSelectable = true,
  selectedIds = [],
  setSelectedIds,
}: MemberListProps) {
  const handleSelectChange = (id: number) => {
    if (!isSelectable || !setSelectedIds) {
      return;
    }
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (!isSelectable || !setSelectedIds) {
      return;
    }

    if (selectedIds.length === members.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(members.map((m) => m.userId));
    }
  };

  const allSelected = selectedIds.length === members.length;

  const messageMap: Record<string, string> = {
    '신청 멤버': '아직 모임 신청 멤버가 없어요~',
    '확정 멤버': '아직 참여 확정된 멤버가 없어요~',
  };

  const emptyMessage = messageMap[title] ?? '표시할 멤버가 없어요.';

  return (
    <div>
      <div className="mb-[0.5rem] text-[1.5rem] font-bold">
        {title}{' '}
        {members.length != 0 && (
          <span className="font-medium text-[#A339FF]">{members.length}</span>
        )}
      </div>
      {members.length === 0 ? (
        <div className="h-[24px] w-full pt-[8px] text-center text-gray-400">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="flex h-[3rem] items-center gap-[1.25rem] bg-[#25252a] px-[1.0625rem] text-[0.9375rem] font-bold">
            {isSelectable ? (
              <div onClick={handleSelectAll} className="cursor-pointer">
                {allSelected ? <Checkbox /> : <CheckboxEmpty />}
              </div>
            ) : (
              <div className="w-[1rem]" />
            )}
            <p className="ml-[4.25rem] w-[8.6875rem]">닉네임</p>
            <p className="w-[10.4375rem]">신청 세션</p>
            <p className="w-[22.875rem]">소개</p>
          </div>
          {members.map((member) => (
            <MemberRow
              key={`${member.userId}-${member.bandSession}`}
              id={member.participantId}
              nickname={member.userNickname}
              session={member.bandSession}
              introduction={member.introduction}
              profileImage={member.profileImagePath}
              selected={selectedIds.includes(member.participantId)}
              onSelectChange={handleSelectChange}
              isSelectable={isSelectable}
            />
          ))}
        </>
      )}
    </div>
  );
}
