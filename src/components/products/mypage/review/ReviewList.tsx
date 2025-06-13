'use client';
import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { REVIEW_METRICS } from '@/constants/review';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useSuspenseReview';
import { ReviewItem } from '@/types/review';
import { getDate } from '@/utils/date';
import { imgChange } from '@/utils/imgChange';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonReviewList from './SkeletonReviewList';

export default function ReviewList() {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useReviewInfiniteQuery({
      size: 8,
    });
  if (!data) return <SkeletonReviewList />;
  const flatData = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <InfinityScroll
      className="flex flex-auto"
      variant="list"
      list={flatData}
      item={(item) => (
        <div
          className="mb-5 rounded-lg bg-[#28282a] px-[3.75rem] py-[3.75rem]"
          key={item.id}
        >
          <div className="mb-6 flex items-center gap-3">
            <DefaultProfileImage width={56} height={56} />
            <p>{item.reviewerNickname}</p>
            <span>{item.reviewerBandSessions}</span>
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
            className="flex w-full items-center justify-between rounded-lg border border-[#464141] py-3 pr-[13px] pl-[27px]"
          >
            {' '}
            <div>
              <p className="leading-6">{item.gatheringName}</p>
              <p className="mt-1 leading-6 opacity-60">
                {item.gatheringHostNickname}
              </p>
            </div>
            <div className="h-[73px] w-[117px] overflow-hidden rounded-lg">
              {}
              <Image
                src={imgChange(item.gatheringThumbnail, 'card')}
                alt={item.gatheringName}
                width={117}
                height={73}
              />
            </div>
          </Link>
        </div>
      )}
      emptyText="아직 리뷰가 없습니다."
      hasMore={!!hasNextPage && !isFetching}
      onInView={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
}
