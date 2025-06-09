'use client';
import React from 'react';
import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getReview } from '@/lib/review/received';
import { REVIEW_METRICS } from '@/constants/review';
import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import { ReviewItem } from '@/types/review';
import { getDate } from '@/utils/date';

export default function ReviewList() {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['getReview'],
    queryFn: getReview,
  });
  if (error && !isFetching) {
    throw error;
  }
  return (
    <ul className="flex flex-auto flex-col gap-5">
      {data.length > 0 ? (
        data.map((item: ReviewItem) => (
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
                (m) => item[m.key as keyof ReviewItem],
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
            <p className="mb-[35px] opacity-60">{getDate(item.createdAt)}</p>
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
  );
}
