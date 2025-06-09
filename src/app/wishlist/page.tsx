'use client';
import React, { useState } from 'react';
import { BandSession, Genre } from '@/types/tags';
import RecruitHeader from '@/components/commons/RecruitHeader';
import { useWishStore } from '@/stores/useWishStore';
import CardItem from '@/components/commons/Card/CardItem';
import VirtualGrid from '@/components/commons/VirtualGrid';
import { GENRE_OPTIONS } from '@/constants/checkbox';
import { CARD_STATE } from '@/constants/card';

export default function Page() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [sessions, setSessions] = useState<BandSession[]>([]);
  const data = useWishStore((s) => s.items);
  const genreLabelToValueMap = GENRE_OPTIONS.reduce(
    (acc, cur) => {
      acc[cur.label] = cur.value;
      return acc;
    },
    {} as Record<string, Genre>,
  );

  const filteredData = data.filter((item) => {
    const hasGenres = genres.length > 0;
    const hasSessions = sessions.length > 0;
    const genreMatched = item.genres.some((label) =>
      genres.includes(genreLabelToValueMap[label]),
    );
    // const sessionMatched = item.member.some((m) =>
    //   sessions.includes(m.session),
    // );

    if (!hasGenres && !hasSessions) return true;
    if (hasGenres && genreMatched) return true;
    // if (hasGenres && sessionMatched) return true;

    return false;
  });
  return (
    <div className="pc:max-w-[84rem] mx-auto mt-8 pb-[5rem]">
      <RecruitHeader
        genres={genres}
        setGenres={setGenres}
        sessions={sessions}
        setSessions={setSessions}
      />
      <VirtualGrid
        list={filteredData}
        item={(item) => (
          <CardItem key={item.id} item={item} status={CARD_STATE.PROGRESS} />
        )}
        emptyText="찜한 항목이 없습니다."
      />
    </div>
  );
}
