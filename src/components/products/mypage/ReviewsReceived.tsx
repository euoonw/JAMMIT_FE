'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import ReviewsReceivedSkeleton from './SkeletonRadar';
import SkeletonReviewList from './SkeletonReviewList';
import { getReview, getStatus } from '@/lib/review/received';
import { dummyReviewData, REVIEW_METRICS } from '@/constants/review';
import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import { ReviewPros } from '@/types/review';
import clsx from 'clsx';

export default function ReviewsReceived() {
  const {
    data: radar,
    isLoading: isLoadingRadar,
    isError: isErrorRadar,
  } = useQuery({
    queryKey: ['reviewRadar'],
    queryFn: getStatus,
  });
  const {
    data: review,
    isLoading: isLoadingReview,
    isError: isErrorReview,
  } = useQuery({
    queryKey: ['getReview'],
    queryFn: getReview,
  });
  const isLoading = isLoadingReview || isLoadingRadar;
  const isError = isErrorReview || isErrorRadar;
  const isEmpty = !review || !radar;

  if (isLoading)
    return (
      <div className="mt-5 flex items-start gap-5">
        <ReviewsReceivedSkeleton />
        <SkeletonReviewList />
      </div>
    );
  if (isError || isEmpty) return <div>오류가 발생했어요 😥</div>;
  // 차트 변환
  const max = Math.max(
    ...REVIEW_METRICS.map((item) => dummyReviewData[item.countKey] ?? 0),
  );
  const chartData = REVIEW_METRICS.map((item) => {
    const count = dummyReviewData[item.countKey] ?? 0;
    return {
      label: item.name,
      value: (count / max) * 100,
      count,
    };
  });
  return (
    <div className="mt-5 flex items-start gap-5">
      <div className="w-[23rem] rounded-lg bg-[#28282a] px-[2.375rem] py-[2.375rem]">
        <div className="mx-auto w-[12.25rem]"></div>
        <ul className="mt-[3.25rem] flex w-full flex-col gap-4">
          {chartData.map((item) => (
            <li
              key={item.label}
              className="relative flex h-10 items-center overflow-hidden rounded-lg bg-[#52525E] px-4"
            >
              <div className="relative z-10 flex w-full justify-between">
                <p>{item.label}</p>
                <p>{item.count}</p>
              </div>
              <div
                className={clsx(
                  'absolute top-0 left-0 z-1 h-full rounded-lg transition-all',
                  item.count === max
                    ? 'bg-[var(--purple-700)]'
                    : 'bg-[#6F52A3]',
                )}
                style={{ width: `${item.value}%` }}
              />
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-auto flex-col gap-5">
        {review.length > 0 ? (
          review.map((item: ReviewPros) => (
            <li
              className="rounded-lg bg-[#28282a] px-[3.75rem] py-[3.75rem]"
              key={item.id}
            >
              <div className="mb-6 flex items-center gap-3">
                <DefaultProfileImage width={56} height={56} />
                <p>{item.reviewerNickname}</p>
                <span>보컬</span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {REVIEW_METRICS.filter(
                  (m) => item[m.key as keyof ReviewPros],
                ).map((m) => (
                  <li
                    key={m.key}
                    className="rounded-lg bg-[var(--bg-34343A)] px-3 py-1.5"
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
              <p className="my-6">{item.content}</p>
              <p className="mb-[35px] opacity-60">
                {dayjs(item.createdAt).format('YYYY.MM.DD')}
              </p>
              <Link
                href={`/group/${item.gatheringId}`}
                className="block w-full rounded-lg border border-[#464141] px-[27px] py-[22px]"
              >
                <p className="leading-6">{item.gatheringName}</p>
                <p className="mt-1 leading-6 opacity-60">데이터 바꿀꺼</p>
              </Link>
            </li>
          ))
        ) : (
          <div className="rounded-lg bg-[#28282a] px-[3.75rem] py-[3.75rem] text-center">
            아직 리뷰가 없습니다.
          </div>
        )}
      </ul>
    </div>
  );
}
