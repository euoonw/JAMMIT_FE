'use client';

import UserCard from '@/components/products/mypage/UserCard';
import ReviewsToWrite from '@/components/products/mypage/towrite/ReviewsToWrite';
import {
  gatherMeCreateQuery,
  useGatherMeCreate,
} from '@/hooks/queries/gather/useGatherMeCreate';
import {
  gatherMeParticipantsQuery,
  useGatherMeParticipants,
} from '@/hooks/queries/gather/useGatherMeParticipants';
import { usePrefetchedCount } from '@/hooks/queries/gather/usePrefetchedCoint';
import { useReviewToWriteInfiniteQuery } from '@/hooks/queries/review/usePrefetchReview';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';
import { useQueryTab } from '@/hooks/useQueryTab';
import clsx from 'clsx';
import { useMemo } from 'react';
import GatheringList from './gather/GatheringList';
import GatheringListComponents from './gather/GatheringListComponents';
import MyReview from './review/MyReview';
import MyVideo from './video/MyVideo';
import { userVideoCountQuery } from '@/hooks/queries/video/useUserVideoCountQuery';

type TabKey =
  | 'participating'
  | 'created'
  | 'reviews_received'
  | 'reviews_towrite'
  | 'video';

export default function MyPage() {
  const { activeTab, setTab } = useQueryTab<TabKey>('tab', 'participating', [
    'participating',
    'created',
    'reviews_received',
    'reviews_towrite',
    'video',
  ]);

  const participatingCount = usePrefetchedCount({
    ...gatherMeParticipantsQuery({ page: 0, size: 1, includeCanceled: true }),
    selector: (data) => data.totalElements,
  });

  const createdCount = usePrefetchedCount({
    ...gatherMeCreateQuery({ page: 0, size: 1, includeCanceled: true }),
    selector: (data) => data.totalElements,
  });

  const { data: write } = useReviewToWriteInfiniteQuery({
    size: 8,
    includeCanceled: false,
  });

  const writeCount =
    write?.pages[0].gatherings.filter((item) => item.status === 'COMPLETED')
      .length ?? 0;
  const { data: review } = useReviewInfiniteQuery({
    size: 8,
  });

  const videoCount = usePrefetchedCount({
    ...userVideoCountQuery(),
    selector: (data) => data.count,
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
        component: <MyReview />,
      },
      {
        key: 'reviews_towrite',
        label: '작성 가능한 리뷰',
        count: writeCount,
        component: <ReviewsToWrite />,
      },
      {
        key: 'video',
        label: '재밋 후기',
        count: videoCount,
        component: <MyVideo />,
      },
    ],
    [participatingCount, createdCount, reviewCount, writeCount, videoCount],
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
    <button
      onClick={() => setTab(key)}
      key={key}
      className={clsx(
        'flex flex-shrink-0 items-center gap-[0.25rem] whitespace-nowrap',
        tabClass(isActive),
        isActive ? 'text-[var(--purple-500)]' : 'text-gray-400',
      )}
    >{`${label} ${count}`}</button>
  );

  return (
    <main className="min-h-screen bg-[#212121] pb-[3.75rem]">
      <UserCard />
      <div className="pc:my-10 pc:max-w-[84rem] pc:px-0 hide-scrollbar mx-auto my-5 flex gap-[1.25rem] overflow-x-auto px-8">
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
