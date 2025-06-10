'use client';
import React, { useState } from 'react';
import { BandSession, Genre } from '@/types/tags';
import RecruitHeader from '@/components/commons/RecruitHeader';
import { useWishStore } from '@/stores/useWishStore';
import CardItem from '@/components/commons/Card/CardItem';
import VirtualGrid from '@/components/commons/VirtualGrid';
import { CARD_STATE } from '@/constants/card';
import { GENRE_OPTIONS, SESSION_OPTIONS } from '@/constants/checkbox';

export default function Page() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [sessions, setSessions] = useState<BandSession[]>([]);
  const data = useWishStore((s) => s.items);

  const filteredData = data.filter((item) => {
    const hasGenres = genres.length > 0;
    const hasSessions = sessions.length > 0;
    const genreMatched = item.genres.some((genre) => {
      const matched = GENRE_OPTIONS.find((item) => item.value === genre);
      return matched ? genres.includes(matched.value) : false;
    });
    const sessionMatched = item.sessions.some((session) => {
      const matched = SESSION_OPTIONS.find(
        (item) => item.value === session.bandSession,
      );
      return matched ? sessions.includes(matched.value) : false;
    });

    if (!hasGenres && !hasSessions) return true;
    if (hasGenres && hasSessions) return genreMatched && sessionMatched;
    if (hasGenres) return genreMatched;
    if (hasSessions) return sessionMatched;
  });
  return (
    <div className="pc:max-w-[84rem] mx-auto mt-8 pb-[5rem]">
      <RecruitHeader
        genres={genres}
        setGenres={setGenres}
        sessions={sessions}
        setSessions={setSessions}
        page="wish"
      />
      <VirtualGrid
        list={filteredData}
        item={(item) => (
          <CardItem
            key={item.id}
            item={item}
            isLike={true}
            status={CARD_STATE.PROGRESS}
          />
        )}
        emptyText="찜한 항목이 없습니다."
      />
    </div>
  );
}
