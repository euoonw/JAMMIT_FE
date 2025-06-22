import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import { REVIEW_METRICS } from '@/constants/review';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { ReviewItem } from '@/types/review';
import { getDate } from '@/utils/date';
import { imgChange } from '@/utils/imgChange';
import Image from 'next/image';
import Link from 'next/link';

export default function ReviewItems({ item }: { item: ReviewItem }) {
  return (
    <div
      className="pc:px-[3.75rem] pc:py-[3.75rem] mb-5 rounded-lg bg-[#28282a] px-6 py-6"
      key={item.id}
    >
      <div className="mb-6 flex items-center gap-3">
        <DefaultProfileImage width={56} height={56} />
        <p className="font-bold">{item.reviewerNickname}</p>
        <span>
          {SESSION_ENUM_TO_KR[item.reviewerBandSession] ??
            item.reviewerBandSession}
        </span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {REVIEW_METRICS.filter((m) => item[m.key as keyof ReviewItem]).map(
          (m) => (
            <li
              key={m.key}
              className="rounded-lg bg-[var(--bg-34343A)] px-3 py-1.5"
            >
              {m.name}
            </li>
          ),
        )}
      </ul>
      <p className="my-6">{item.content}</p>
      <p className="mb-[35px] opacity-60">{getDate(item.createdAt)}</p>
      <Link
        href={`/group/${item.gatheringId}?tab=recruit`}
        className="pc:py-3 pc:pr-[13px] pc:pl-[27px] tab:px-3 flex w-full items-center justify-between rounded-lg border border-[#464141] px-5 py-4"
      >
        <div className="flex-[1] overflow-hidden pr-4">
          <p className="truncate leading-6">{item.gatheringName}</p>
          <p className="mt-1 truncate leading-6 opacity-60">
            {item.gatheringHostNickname}
          </p>
        </div>
        <div className="h-[73px] w-[117px] overflow-hidden rounded-lg">
          <Image
            src={imgChange(item.gatheringThumbnail, 'card')}
            alt={item.gatheringName}
            width={117}
            height={73}
          />
        </div>
      </Link>
    </div>
  );
}
