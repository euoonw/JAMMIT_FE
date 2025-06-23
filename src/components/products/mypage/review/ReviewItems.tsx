import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import GoGether from '@/components/commons/GoGether';
import { REVIEW_METRICS } from '@/constants/review';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { ReviewItem } from '@/types/review';
import { formatDateToYYMMDD } from '@/utils/formatDate';

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
      <p className="mb-[35px] opacity-60">
        {formatDateToYYMMDD(item.createdAt)}
      </p>
      <GoGether
        gatheringId={item.gatheringId}
        gatheringName={item.gatheringName}
        gatheringHostNickname={item.gatheringHostNickname}
        gatheringThumbnail={item.gatheringThumbnail}
      />
    </div>
  );
}
