'use client';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';
import { useUserStore } from '@/stores/useUserStore';
import { useSentryErrorLogger } from '@/utils/useSentryErrorLogger';
import ReviewItems from './ReviewItems';
import SkeletonReviewList from './SkeletonReviewList';

export default function ReviewList() {
  const { user, isLoaded, isRefreshing } = useUserStore();
  const isQueryReady = isLoaded && !isRefreshing && !!user;

  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useReviewInfiniteQuery({
      size: 8,
      enabled: isQueryReady,
    });
  useSentryErrorLogger({
    isError: !!isError,
    error: isError,
    tags: { section: 'review', action: 'my_reviews' },
    extra: { userId: user?.id },
  });
  if (!data) return <SkeletonReviewList />;
  const flatData = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <InfinityScroll
      className="flex flex-auto"
      variant="list"
      list={flatData}
      item={(item) => <ReviewItems item={item} />}
      emptyText="아직 리뷰가 없습니다."
      hasMore={!!hasNextPage && !isFetching}
      onInView={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
}
