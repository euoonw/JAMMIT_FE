'use client';

import { useState, useEffect } from 'react';
import Created from '@/components/products/mypage/gather/Created';
import { GatheringCard } from '@/types/card';
import { useGatherMeCreate } from '@/hooks/queries/gather/useGatherMeCreate';

type CreatedListProps = {
  size?: number;
  includeCanceled?: boolean;
  onCountChange?: (count: number) => void;
};

export default function CreatedList({
  size = 8,
  includeCanceled = true,
  onCountChange,
}: CreatedListProps) {
  const [page, setPage] = useState(0);
  const [list, setList] = useState<GatheringCard[]>([]);

  const { data } = useGatherMeCreate({
    page,
    size,
    includeCanceled,
  });

  console.log(data);

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
    <Created
      gatherings={list}
      currentPage={page}
      totalPage={data?.totalPage ?? 1}
      onLoadMore={loadMore}
    />
  );
}
