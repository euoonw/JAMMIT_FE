'use client';

import { useEffect, useState } from 'react';
import { CARD_STATE } from '@/constants/card';
import { GatheringCard } from '@/types/card';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { GatheringsResponse } from '@/types/gather';
import CardItem from '@/components/commons/Card/CardItem';

// TODO: Recruit interface 변경이후 변경 필요
export default function Created({
  gatherings,
  currentPage,
  totalPage,
}: GatheringsResponse) {
  const [page, setPage] = useState(currentPage);
  const [items, setItems] = useState<GatheringCard[]>(gatherings);
  const [hasMore, setHasMore] = useState(currentPage + 1 < totalPage);

  useEffect(() => {
    if (page !== 0) {
      // interface교체 후 아래 코드로 반영 필요
      // setItems((prev) => [...prev, ...data.gatherings]);
      setItems((prev) => prev);
      const isLastPage = currentPage + 1 >= totalPage;
      setHasMore(!isLastPage);
    }
  }, [page, currentPage, totalPage]);

  const handleInView = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <InfinityScroll<GatheringCard>
      list={items}
      item={(item) => <CardItem item={item} status={CARD_STATE.COMPLETED} />}
      emptyText="참여 중인 모집이 없습니다."
      onInView={handleInView}
      hasMore={hasMore}
    />
  );
}
