'use client';
import React, { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getLiked } from '@/lib/wish/wish';
import { BandSession, Genre } from '@/types/tags';
import { makeWishQueryKey, RecruitPageProps } from '@/types/wish';
import RecruitHeader from '@/components/commons/RecruitHeader';
import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';

export default function RecruitPage({
  defaultGenres,
  defaultSessions,
}: RecruitPageProps) {
  // 장르, 세션
  const [genres, setGenres] = useState<Genre[]>(defaultGenres);
  const [sessions, setSessions] = useState<BandSession[]>(defaultSessions);
  const queryKey = useMemo(
    () =>
      makeWishQueryKey({
        genres,
        sessions,
        includeCanceled: false,
      }),
    [genres, sessions],
  );
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ queryKey, pageParam = 0 }) => getLiked({ queryKey, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];
  return (
    <div className="pc:max-w-[84rem] mx-auto mt-8 pb-[5rem]">
      <RecruitHeader
        genres={genres}
        setGenres={setGenres}
        sessions={sessions}
        setSessions={setSessions}
      />
      <InfinityScroll
        list={flatData}
        item={(item) => (
          <CardItem item={item} isLike={true} status={CARD_STATE.PROGRESS} />
        )}
        emptyText=""
        hasMore={!!hasNextPage && !isFetching}
        onInView={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
    </div>
  );
}
