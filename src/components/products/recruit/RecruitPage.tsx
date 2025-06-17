'use client';
import CardItem from '@/components/commons/Card/CardItem';
import InfinityScroll from '@/components/commons/InfinityScroll';
import RecruitHeader from '@/components/commons/RecruitHeader';
import ShareLinkModal from '@/components/products/group/ShareLinkModal';
import { CARD_STATE } from '@/constants/card';
import { useCommonInfiniteQuery } from '@/hooks/queries/recruit/useRecruit';
import { RecruitPageProps } from '@/types/recruit';
import { BandSession, Genre } from '@/types/tags';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecruitPage({
  defaultGenres,
  defaultSessions,
  showShareModal = false,
  shareGroupId,
}: RecruitPageProps) {
  // 장르, 세션
  const [genres, setGenres] = useState<Genre[]>(defaultGenres);
  const [sessions, setSessions] = useState<BandSession[]>(defaultSessions);
  const [sort, setSort] = useState<string>('recruitDeadline,asc');
  const [isShareModalOpen, setIsShareModalOpen] = useState(showShareModal);
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useCommonInfiniteQuery({
      key: 'list',

      size: 8,
      genres,
      sessions,
      sort,
    });

  const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];

  const handleModalClose = () => {
    setIsShareModalOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('showShareModal');
    url.searchParams.delete('groupId');
    router.replace(url.pathname);
  };
  useEffect(() => {
    setIsShareModalOpen(showShareModal);
  }, [showShareModal]);
  const isInitialLoading = !data && isFetching;
  return (
    <>
      <div className="pc:max-w-[84rem] pc:mt-8 pc:pb-[5rem] mx-auto max-w-full pb-[1.375rem]">
        <RecruitHeader
          genres={genres}
          setGenres={setGenres}
          sessions={sessions}
          setSessions={setSessions}
          setSort={setSort}
          sort={sort}
        />
        <InfinityScroll
          isInitialLoading={isInitialLoading}
          list={flatData}
          item={(item) => (
            <CardItem item={item} isLike={true} status={CARD_STATE.PROGRESS} />
          )}
          emptyText="해당 모임이 존재하지 않습니다."
          hasMore={!!hasNextPage && !isFetching}
          onInView={() => {
            if (hasNextPage && !isFetching) {
              fetchNextPage();
            }
          }}
        />
      </div>

      {isShareModalOpen && shareGroupId && (
        <ShareLinkModal
          inviteLink={`https://jammit-fe-six.vercel.app/group/${shareGroupId}`}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
