import { imgChange } from '@/utils/imgChange';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface GoGetherprop {
  gatheringId: number;
  gatheringName: string;
  gatheringHostNickname: string;
  gatheringThumbnail: string;
  linkable?: boolean;
  selected?: boolean;
}

export default function GoGether({
  gatheringId,
  gatheringName,
  gatheringHostNickname,
  gatheringThumbnail,
  linkable = true,
  selected = false,
}: GoGetherprop) {
  const content = (
    <div
      className={clsx(
        'pc:py-3 pc:pr-[13px] pc:pl-[27px] tab:px-3 flex w-full items-center justify-between rounded-lg border px-5 py-4',
        selected ? 'border-purple-500' : 'border-[#464141]',
      )}
    >
      <div className="flex-[1] overflow-hidden pr-4">
        <p className="truncate leading-6">{gatheringName}</p>
        <p className="mt-1 truncate leading-6 opacity-60">
          {gatheringHostNickname}
        </p>
      </div>
      <div className="h-[73px] w-[117px] overflow-hidden rounded-lg">
        <Image
          src={imgChange(gatheringThumbnail, 'card')}
          alt={gatheringName}
          width={117}
          height={73}
        />
      </div>
    </div>
  );

  return linkable ? (
    <Link href={`/group/${gatheringId}?tab=recruit`}>{content}</Link>
  ) : (
    content
  );
}
