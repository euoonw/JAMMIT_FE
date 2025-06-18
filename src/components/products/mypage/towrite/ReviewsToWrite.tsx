'use client';
import CardItem from '@/components/commons/Card/CardItem';
import CardSkeleton from '@/components/commons/Card/SkeletonItem';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { CARD_STATE } from '@/constants/card';
import { useReviewToWriteInfiniteQuery } from '@/hooks/queries/review/usePrefetchReview';
import { useUserMeQuery } from '@/hooks/queries/user/useUserMeQuery';
import { useSentryErrorLogger } from '@/utils/useSentryErrorLogger';

export default function ReviewsToWrite() {
  const { data: user } = useUserMeQuery();
  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useReviewToWriteInfiniteQuery({
      size: 8,
      includeCanceled: false,
      id: user?.id as number,
    });
  useSentryErrorLogger({
    isError: !!isError,
    error: isError,
    tags: { section: 'review', action: 'write_reviews' },
    extra: { userId: user?.id },
  });
  if (!data) {
    return (
      <div className="pc:grid-cols-4 pc:gap-x-5 pc:px-0 tab:px-6 grid grid-cols-1 gap-y-10 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];
  const completedData = flatData.filter((item) => item.status === 'COMPLETED');
  return (
    <>
      <InfinityScroll
        list={completedData}
        item={(item) => (
          <CardItem item={item} status={CARD_STATE.ENSEMBLE} page="towrite" />
        )}
        emptyText="리뷰가능한 모임이 없습니다."
        hasMore={!!hasNextPage && !isFetching}
        onInView={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
}
