'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/commons/Card';
import { CARD_STATE } from '@/constants/card';
import { GatheringCard } from '@/types/card';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { GatheringsResponse } from '@/types/gather';
import { StaticImageData } from 'next/image';

// TODO: Recruit interface 변경이후 변경 필요
export default function Participating({
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

  const renderCard = (item: GatheringCard) => (
    <Link key={item.id} href={`de/${item.id}`}>
      <Card.Thumbnail
        // 임시 추가
        thumbnail={item.thumbnail as unknown as StaticImageData}
        alt={item.name}
        isLike={false}
      />
      <Card.TagList tags={item.genres} />
      <Card.TitleBlock title={item.name} author={item.creator.nickname} />
      <Card.Footer
        status={CARD_STATE.COMPLETED}
        totalCurrent={item.totalCurrent}
        totalRecruit={item.totalRecruit}
        recruitDeadline={item.recruitDeadline}
        //member={item.member}
      />
    </Link>
  );

  return (
    <InfinityScroll<GatheringCard>
      list={items}
      item={renderCard}
      emptyText="참여 중인 모집이 없습니다."
      onInView={handleInView}
      hasMore={hasMore}
    />
  );
}
