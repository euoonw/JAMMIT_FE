'use client';
import React, { useState } from 'react';
import { getRecruit } from '@/lib/recruit/recruit';
import { BandSession, Genre } from '@/types/tags';
import { RecruitPageProps } from '@/types/recruit';
import RecruitHeader from '@/components/commons/RecruitHeader';
import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';
import { useCommonInfiniteQuery } from '@/hooks/queries/recruit/useRecruit';

export default function RecruitPage({
  defaultGenres,
  defaultSessions,
}: RecruitPageProps) {
  // 장르, 세션
  const [genres, setGenres] = useState<Genre[]>(defaultGenres);
  const [sessions, setSessions] = useState<BandSession[]>(defaultSessions);
  const [sort, setSort] = useState<string>('');
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useCommonInfiniteQuery({
      key: 'list',
      variables: { genres, sessions, sort },
      size: 8,
      sort,
      includeCanceled: false,
      fetchFn: getRecruit,
    });

  const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];
  return (
    <div className="pc:max-w-[84rem] mx-auto mt-8 pb-[5rem]">
      <RecruitHeader
        genres={genres}
        setGenres={setGenres}
        sessions={sessions}
        setSessions={setSessions}
        setSort={setSort}
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
