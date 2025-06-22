'use client';

import { useReviewQuery } from '@/hooks/queries/review/usePrefetchReview';
import { ReviewRequest } from '@/types/review';
import VirtualGrid from '../../commons/VirtualGrid';
import ReviewItems from '../mypage/review/ReviewItems';
import ReviewStatusItem from '../mypage/review/ReviewsReceived';
import SkeletonReviewList from '../mypage/review/SkeletonReviewList';
import SkeletonStatus from '../mypage/review/SkeletonStatus';
import SkeletonUserCard from '../mypage/SkeletonUserCard';
import UserCardItem from '../mypage/UserCardItem';
import { useQueryTab } from '@/hooks/useQueryTab';
import { useMemo } from 'react';
import clsx from 'clsx';
import { useUserStore } from '@/stores/useUserStore';
import MyVideo from '../mypage/video/MyVideo';
import { usePrefetchedCount } from '@/hooks/queries/gather/usePrefetchedCoint';
import { userVideoCountQuery } from '@/hooks/queries/video/useUserVideoCountQuery';

type TabKey = 'reviews' | 'video';

export default function ReviewPageClient({
  gatheringId,
  userId,
}: ReviewRequest) {
  const { activeTab, setTab } = useQueryTab<TabKey>('tab', 'reviews', [
    'reviews',
    'video',
  ]);
  const { user, isLoaded, isRefreshing } = useUserStore();
  const isQueryReady = isLoaded && !isRefreshing && !!user;

  const videoCount = usePrefetchedCount({
    ...userVideoCountQuery({ userId }),
    selector: (data) => data.count,
    enabled: isQueryReady,
  });

  const { data, isLoading } = useReviewQuery(
    { gatheringId, userId },
    { enabled: isQueryReady },
  );

  const tabList = useMemo(
    () => [
      {
        key: 'reviews',
        label: '받은 리뷰',
        count: data ? data.statistics.totalReviews : 0,
        component: data ? (
          <div className="pc:max-w-[84rem] mx-auto my-10 flex items-start gap-5">
            <ReviewStatusItem data={data.statistics} />
            <VirtualGrid
              className="flex flex-auto"
              list={data.reviews}
              variant="list"
              item={(item) => <ReviewItems key={item.id} item={item} />}
              emptyText="아직 리뷰가 없습니다."
            />
          </div>
        ) : (
          <div>
            <div className="pc:max-w-[84rem] mx-auto flex items-start gap-5">
              <SkeletonStatus />
              <SkeletonReviewList />
            </div>
          </div>
        ),
      },
      {
        key: 'video',
        label: '재밋 후기',
        count: videoCount,
        component: <MyVideo userId={userId} />,
      },
    ],
    [data, videoCount, userId],
  );

  if (!data || isLoading) {
    return (
      <div>
        <SkeletonUserCard />
      </div>
    );
  }

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
    <div>
      <UserCardItem user={data.userInfo} type="review" isMypage={false} />
      <div className="pc:my-10 pc:max-w-[84rem] pc:px-0 hide-scrollbar mx-auto my-5 flex gap-[1.25rem] overflow-x-auto px-8">
        {tabList.map(({ key, label, count }) =>
          renderTabButton(key as TabKey, label, count, activeTab === key),
        )}
      </div>
      <div className="pc:max-w-[84rem] mx-auto max-w-full">
        {tabList.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
}
