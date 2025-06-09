import clsx from 'clsx';
import { useMemo } from 'react';
import { useQueryTab } from '@/hooks/useQueryTab';
import UserCard from '@/components/products/mypage/UserCard';
import Participating from '@/components/products/mypage/Participating';
import Created from '@/components/products/mypage/Created';
import ReviewsReceived from '@/components/products/mypage/ReviewsReceived';
import ReviewsToWrite from '@/components/products/mypage/ReviewsToWrite';
import { useGatherMeCreate } from '@/hooks/queries/gather/useGatherMeCreate';
import { useGatherMeParticipants } from '@/hooks/queries/gather/useGatherMeParticipants';

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

  const { data: participatingData } = useGatherMeParticipants({
    page: 0,
    size: 8,
    includeCanceled: true,
  });
  const { data: createdData } = useGatherMeCreate({
    page: 0,
    size: 8,
    includeCanceled: true,
  });

  const tabList = useMemo(
    () => [
      {
        key: 'participating',
        label: '참여 모임',
        count: participatingData?.totalElements ?? 0,
        component: (
          <Participating
            gatherings={participatingData?.gatherings ?? []}
            currentPage={participatingData?.currentPage ?? 0}
            totalPage={participatingData?.totalPage ?? 1}
            totalElements={participatingData?.totalElements ?? 0}
          />
        ),
      },
      {
        key: 'created',
        label: '내가 만든 모임',
        count: createdData?.totalElements ?? 0,
        component: (
          <Created
            gatherings={createdData?.gatherings ?? []}
            currentPage={createdData?.currentPage ?? 0}
            totalPage={createdData?.totalPage ?? 1}
            totalElements={createdData?.totalElements ?? 0}
          />
        ),
      },
      {
        key: 'reviews_received',
        label: '내가 받은 리뷰',
        count: 2, // API 연결 시 수정
        component: <ReviewsReceived />,
      },
      {
        key: 'reviews_towrite',
        label: '작성 가능한 리뷰',
        count: 2, // API 연결 시 수정
        component: <ReviewsToWrite />,
      },
    ],
    [participatingData, createdData],
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
