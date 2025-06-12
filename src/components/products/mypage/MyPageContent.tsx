'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useQueryTab } from '@/hooks/useQueryTab';
import UserCard from '@/components/products/mypage/UserCard';
import ReviewsReceived from '@/components/products/mypage/review/ReviewsReceived';
import ReviewsToWrite from '@/components/products/mypage/towrite/ReviewsToWrite';
import { useReviewToWriteInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useSuspenseReview';
import ParticipatingList from './gather/ParticipatingList';
import CreatedList from './gather/CreatedList';

type TabKey =
  | 'participating'
  | 'created'
  | 'reviews_received'
  | 'reviews_towrite';

export default function MyPage() {
  const { activeTab, setTab } = useQueryTab<TabKey>('tab', 'participating', [
    'participating',
    'created',
    'reviews_received',
    'reviews_towrite',
  ]);

  const [participatingCount, setParticipatingCount] = useState(0);
  const [createdCount, setCreatedCount] = useState(0);

  const { data: write } = useReviewToWriteInfiniteQuery({
    size: 8,
    includeCanceled: true,
  });
  const writeCount = write?.pages[0].totalElements ?? 0;

  const { data: review } = useReviewInfiniteQuery({ size: 8 });
  const reviewCount = review?.pages[0].totalElements ?? 0;

  const tabList = useMemo(
    () => [
      {
        key: 'participating',
        label: '참여 모임',
        count: participatingCount,
        component: <ParticipatingList onCountChange={setParticipatingCount} />,
      },
      {
        key: 'created',
        label: '내가 만든 모임',
        count: createdCount,
        component: <CreatedList onCountChange={setCreatedCount} />,
      },
      {
        key: 'reviews_received',
        label: '내가 받은 리뷰',
        count: reviewCount,
        component: <ReviewsReceived />,
      },
      {
        key: 'reviews_towrite',
        label: '작성 가능한 리뷰',
        count: writeCount,
        component: <ReviewsToWrite />,
      },
    ],
    [participatingCount, createdCount, reviewCount, writeCount],
  );

  const tabClass = (isActive: boolean) =>
    clsx(
      'text-[1rem]',
      isActive
        ? 'text-gray-100 underline decoration-purple-700 decoration-[3px] underline-offset-[6px]'
        : 'text-gray-400 cursor-pointer',
    );

  const renderTabButton = (
    key: TabKey,
    label: string,
    count: number,
    isActive: boolean,
  ) => (
    <div key={key} className="flex items-center gap-[0.2rem]">
      <button
        onClick={() => setTab(key)}
        className={clsx(
          'flex items-center gap-[0.25rem]',
          tabClass(isActive),
          isActive ? 'text-purple-500' : 'text-gray-400',
        )}
      >{`${label} ${count}`}</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#212121] pb-[3.75rem]">
      <UserCard />
      <div className="mx-auto flex h-[4.625rem] w-[84rem] gap-[1.25rem]">
        {tabList.map(({ key, label, count }) =>
          renderTabButton(key as TabKey, label, count, activeTab === key),
        )}
      </div>
      <div className="mx-auto h-auto w-[84rem]">
        {tabList.find((tab) => tab.key === activeTab)?.component}
      </div>
    </main>
  );
}
