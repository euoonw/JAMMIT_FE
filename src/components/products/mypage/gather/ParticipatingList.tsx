'use client';

import { useState, useEffect } from 'react';
import Participating from '@/components/products/mypage/gather/Participating';
import { GatheringCard } from '@/types/card';
import { useGatherMeParticipants } from '@/hooks/queries/gather/useGatherMeParticipants';

type ParticipatingListProps = {
  size?: number;
  includeCanceled?: boolean;
  onCountChange?: (count: number) => void;
};

export default function ParticipatingList({
  size = 8,
  includeCanceled = true,
  onCountChange,
}: ParticipatingListProps) {
  const [page, setPage] = useState(0);
  const [list, setList] = useState<GatheringCard[]>([]);

  const { data } = useGatherMeParticipants({
    page,
    size,
    includeCanceled,
  });

  useEffect(() => {
    if (data) {
      setList((prev) =>
        page === 0 ? data.gatherings : [...prev, ...data.gatherings],
      );
      if (onCountChange) {
        onCountChange(data.totalElements);
      }
    }
  }, [page, data, onCountChange]);

  const loadMore = () => {
    if (page + 1 < (data?.totalPage ?? 1)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Participating
      gatherings={list}
      currentPage={page}
      totalPage={data?.totalPage ?? 1}
      onLoadMore={loadMore}
    />
  );
}
