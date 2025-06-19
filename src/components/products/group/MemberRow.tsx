import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import ProfileImage from '@/components/commons/ProfileImage';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import Link from 'next/link';

interface MemberRowProps {
  id: number;
  selected: boolean;
  onSelectChange: (id: number) => void;
  nickname: string;
  session: string;
  introduction: string;
  profileImage?: string | null;
  isSelectable?: boolean;
  gatheringId?: number;
}

export default function MemberRow({
  id,
  selected,
  onSelectChange,
  nickname,
  session,
  introduction,
  profileImage = null,
  isSelectable = true,
  gatheringId: gatheringId,
}: MemberRowProps) {
  return (
    <div>
      <div className="my-[0.75rem] flex items-center gap-[1.25rem] px-[1.0625rem]">
        {isSelectable ? (
          <div onClick={() => onSelectChange(id)} className="cursor-pointer">
            {selected ? <Checkbox /> : <CheckboxEmpty />}
          </div>
        ) : (
          <div className="w-[1rem]" />
        )}

        <div className="pc:flex-row flex w-full flex-col">
          <div className="tab:gap-[1.25rem] mr-[1.25rem] flex items-center gap-[0.75rem]">
            <ProfileImage src={profileImage} size={3} />

            <div className="pc:w-[8.6875rem] underline underline-offset-2">
              <Link href={`/group/${gatheringId}/reviews/${id}`}>
                {nickname}
              </Link>
            </div>

            <div className="pc:w-[10.4375rem] flex gap-[0.25rem]">
              <div className="rounded-[0.5rem] bg-[#34343A] px-[0.75rem] py-[0.375rem] text-gray-100">
                {SESSION_ENUM_TO_KR[session]}
              </div>
            </div>
          </div>

          <div className="pc:w-[22.875rem] pc:mt-0 mt-[0.75rem] break-keep whitespace-pre-line">
            {introduction}
          </div>
        </div>
      </div>

      <div className="border-b-[0.0625rem] border-[#2D3035]" />
    </div>
  );
}
