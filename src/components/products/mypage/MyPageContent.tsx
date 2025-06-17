'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import UserCard from '@/components/products/mypage/UserCard';
import GatheringList from '@/components/products/mypage/gather/GatheringList';
import GatheringListComponents from '@/components/products/mypage/gather/GatheringListComponents';
import ReviewsReceived from '@/components/products/mypage/review/ReviewsReceived';
import ReviewsToWrite from '@/components/products/mypage/towrite/ReviewsToWrite';
import { usePrefetchedCount } from '@/hooks/queries/gather/usePrefetchedCoint';
import {
  gatherMeParticipantsQuery,
  useGatherMeParticipants,
} from '@/hooks/queries/gather/useGatherMeParticipants';
import {
  gatherMeCreateQuery,
  useGatherMeCreate,
} from '@/hooks/queries/gather/useGatherMeCreate';
import { useReviewToWriteInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useSuspenseReview';
import { useUserMeQuery } from '@/hooks/queries/user/useUserMeQuery';
import { useQueryTab } from '@/hooks/useQueryTab';

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

  const participatingCount = usePrefetchedCount({
    ...gatherMeParticipantsQuery({ page: 0, size: 1, includeCanceled: true }),
    selector: (data) => data.totalElements,
  });

  const createdCount = usePrefetchedCount({
    ...gatherMeCreateQuery({ page: 0, size: 1, includeCanceled: true }),
    selector: (data) => data.totalElements,
  });

  const { data: user } = useUserMeQuery();

  const { data: write } = useReviewToWriteInfiniteQuery({
    size: 8,
    includeCanceled: false,
    id: user?.id as number,
  });

  const writeCount =
    write?.pages[0].gatherings.filter((item) => item.status === 'COMPLETED')
      .length ?? 0;
  const { data: review } = useReviewInfiniteQuery({
    size: 8,
    id: user?.id as number,
  });

  const reviewCount = review?.pages[0].totalElements ?? 0;

  const tabList = useMemo(
    () => [
      {
        key: 'participating',
        label: '참여 모임',
        count: participatingCount,
        component: (
          <GatheringList
            useHook={useGatherMeParticipants}
            renderComponent={(props) => (
              <GatheringListComponents
                {...props}
                emptyText="참여 중인 모집이 없습니다."
              />
            )}
            errorConfig={{ section: 'participating', action: 'participating' }}
          />
        ),
      },
      {
        key: 'created',
        label: '내가 만든 모임',
        count: createdCount,
        component: (
          <GatheringList
            useHook={useGatherMeCreate}
            renderComponent={(props) => (
              <GatheringListComponents
                {...props}
                emptyText="생성한 모집이 없습니다."
              />
            )}
            errorConfig={{ section: 'created', action: 'created' }}
          />
        ),
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
    [participatingCount, createdCount, writeCount, reviewCount],
  );

  const tabClass = (isActive: boolean) =>
    clsx(
      'text-[1rem]',
      isActive
        ? 'relative after:absolute after:left-0 after:-bottom-[8px] after:h-[2px] after:w-full after:bg-[var(--purple-500)]'
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
          isActive ? 'text-[var(--purple-500)]' : 'text-gray-400',
        )}
      >{`${label} ${count}`}</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#212121] pb-[3.75rem]">
      <UserCard />
      <div className="mx-auto my-10 flex w-[84rem] gap-[1.25rem]">
        {tabList.map(({ key, label, count }) =>
          renderTabButton(key as TabKey, label, count, activeTab === key),
        )}
      </div>
      <div className="pc:max-w-[84rem] mx-auto max-w-full">
        {tabList.find((tab) => tab.key === activeTab)?.component}
      </div>
    </main>
  );
}
