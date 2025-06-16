'use client';

import Participating from '@/components/products/mypage/gather/Participating';
import { useGatherMeParticipants } from '@/hooks/queries/gather/useGatherMeParticipants';
import { GatheringCard } from '@/types/card';
import { useSentryErrorLogger } from '@/utils/useSentryErrorLogger';
import { useEffect, useState } from 'react';

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

  const { data, isError } = useGatherMeParticipants({
    page,
    size,
    includeCanceled,
  });
  useSentryErrorLogger({
    isError: !!isError,
    error: isError,
    tags: { section: 'participating', action: 'participating' },
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
