'use client';
import { VideoCard } from '@/components/products/videos/VideoCard';
import VideoListBanner from './VideoListBanner';
import { useState } from 'react';
import VideoListControlBar from './VideoListControBar';
import { useVideoInfiniteQuery } from '@/hooks/queries/video/useVideoInfiniteQuery';
import InfinityScroll from '@/components/commons/InfinityScroll';

export default function VideoList() {
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useVideoInfiniteQuery({ sort, size: 12 });

  const flatVideos = data?.pages.flatMap((page) => page.data) ?? [];
  const isInitialLoading = isLoading && flatVideos.length === 0;

  const weekTopVideoId = data?.pages?.[0]?.weekTopVideo?.id ?? null;

  return (
    <div className="pc:max-w-[84rem] pc:mt-8 pc:pb-[5rem] mx-auto max-w-full pb-[5.75rem]">
      <VideoListBanner weekTopVideoId={weekTopVideoId} />
      <VideoListControlBar setSort={setSort} sort={sort} />
      <InfinityScroll
        isInitialLoading={isInitialLoading}
        list={flatVideos}
        item={(video) => <VideoCard key={video.id} video={video} />}
        emptyText="업로드된 영상이 없습니다."
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
