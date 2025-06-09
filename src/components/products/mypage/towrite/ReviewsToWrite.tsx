'use client';
import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';

export default function ReviewsToWrite() {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useReviewInfiniteQuery({ size: 8, includeCanceled: true });

  const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];
  return (
    <InfinityScroll
      list={flatData}
      item={(item) => <CardItem item={item} status={CARD_STATE.ENSEMBLE} />}
      emptyText="리뷰가능한 모임이 없습니다."
      hasMore={!!hasNextPage && !isFetching}
      onInView={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
}
