import React, { Fragment, useCallback } from 'react';
import Image from 'next/image';
import MultiSelectDropdown from '@/components/commons/MultiSelectDropdown';
import { GENRE_OPTIONS, SESSION_OPTIONS } from '@/constants/checkbox';
import { BandSession, Genre } from '@/types/tags';
import ImgMainBanner from '@/assets/images/img_main_banner.jpg';
import IcSort from '@/assets/icons/ic_sort.svg';
import Link from 'next/link';

interface FilterHeaderProps {
  genres: Genre[];
  setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
  sessions: BandSession[];
  setSessions: React.Dispatch<React.SetStateAction<BandSession[]>>;
  setSort?: React.Dispatch<React.SetStateAction<string>>;
  page?: string;
}

export default function RecruitHeader({
  genres,
  setGenres,
  sessions,
  setSessions,
  setSort,
  page = 'main',
}: FilterHeaderProps) {
  const handleSort = useCallback(() => {
    setSort?.('recruitDeadline,asc');
  }, [setSort]);
  return (
    <Fragment>
      <div className="relative h-[15rem] overflow-hidden rounded-lg">
        <div className="absolute top-[5.875rem] left-[7.312rem]">
          <span
            className="text-2xl leading-6 font-semibold text-[#DAA3FF]"
            style={{ letterSpacing: '-4%' }}
          >
            함께하면 더 재밌으니까, 재밋! 🤟‍️️
          </span>
          <p
            className="mt-5 text-4xl leading-8 font-semibold"
            style={{ letterSpacing: '-4%' }}
          >
            지금 모임에 참여해보세요
          </p>
        </div>
        <Image src={ImgMainBanner} alt="메인이미지" width={1344} height={250} />
      </div>
      <div className="mt-8 mb-9 flex items-center justify-between">
        <div className="flex gap-2">
          <MultiSelectDropdown
            label="장르"
            options={GENRE_OPTIONS}
            selected={genres}
            onChange={setGenres}
          />
          <MultiSelectDropdown
            label="세션"
            options={SESSION_OPTIONS}
            selected={sessions}
            onChange={setSessions}
          />
          {page !== 'wish' && (
            <button
              onClick={handleSort}
              className="flex h-10 w-[6.875rem] items-center justify-center gap-1 rounded-lg bg-[var(--gray-100)] text-sm"
            >
              <IcSort />
              마감임박
            </button>
          )}
        </div>
        {page !== 'wish' && (
          <Link
            href="/jam"
            className="h-11 w-[9.25rem] rounded-lg bg-[var(--purple-700)] text-center leading-11 font-semibold text-white"
          >
            모임만들기
          </Link>
        )}
      </div>
    </Fragment>
  );
}
