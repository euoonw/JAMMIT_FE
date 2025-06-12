'use client';
import IcSort from '@/assets/icons/ic_sort.svg';
import ImgMainMobBanner from '@/assets/images/main/img_main_banner_mob.jpg';
import ImgMainPcBanner from '@/assets/images/main/img_main_banner_pc.jpg';
import ImgMainTabBanner from '@/assets/images/main/img_main_banner_tab.jpg';
import MultiSelectDropdown from '@/components/commons/MultiSelectDropdown';
import { GENRE_OPTIONS, SESSION_OPTIONS } from '@/constants/checkbox';
import { useDeviceType } from '@/hooks/useDeviceType';
import { BandSession, Genre } from '@/types/tags';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

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
  // 반응형 이미지
  const [src, setSrc] = useState<StaticImageData | null>(null);
  const device = useDeviceType();
  useEffect(() => {
    if (device === 'mob') setSrc(ImgMainMobBanner);
    else if (device === 'tab') setSrc(ImgMainTabBanner);
    else setSrc(ImgMainPcBanner);
  }, [device]);
  // 반응형
  const handleSort = useCallback(() => {
    setSort?.('recruitDeadline,asc');
  }, [setSort]);

  if (!src) return null;
  return (
    <Fragment>
      <div className="pc:aspect-[1344/250] tab:aspect-[186/49] relative aspect-[375/199] overflow-hidden rounded-lg">
        {(device === 'tab' || device === 'mob') && (
          <div className="tab:left-[3.75rem] tab:-translate-x-0 absolute top-1/2 left-1/2 z-5 block -translate-x-1/2 -translate-y-1/2">
            <p className="tab:text-[1.25rem] tab:tracking-[-0.04em] text-base leading-[1.5rem] text-[#DAA3FF]">
              함께하면 더 재밌으니까, 재밋 🤘️️
            </p>
            <em className="tab:tracking-[-0.04em] tab:text-[2rem] tab:mt-3 mt-2 block text-[1.25rem] leading-[2rem] font-semibold">
              지금 모임에 참여해보세요!
            </em>
          </div>
        )}
        <Image
          src={src}
          alt="메인이미지"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="pc:px-0 tab:px-6 mt-8 mb-9 flex items-center justify-between px-4">
        <div className="pc:w-auto pc:justify-normal flex w-full justify-between gap-2">
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
          </div>
          {page !== 'wish' && (
            <button
              onClick={handleSort}
              className="pc:h-10 pc:w-[6.875rem] pc:gap-1 pc:rounded-lg pc:text-sm flex h-9 w-9 items-center justify-center gap-0 rounded-xl bg-[var(--gray-100)] text-[0px]"
            >
              <IcSort />
              마감임박
            </button>
          )}
        </div>
        {page !== 'wish' && (
          <Link
            href="/jam"
            className="pc:static pc:w-[9.25rem] tab:w-[calc(100%-48px)] fixed bottom-[1.375rem] z-30 h-11 w-[calc(100%-32px)] rounded-lg bg-[var(--purple-700)] text-center leading-11 font-semibold text-white"
          >
            모임만들기
          </Link>
        )}
      </div>
    </Fragment>
  );
}
