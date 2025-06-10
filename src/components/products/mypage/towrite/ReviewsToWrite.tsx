'use client';
import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';
import { useReviewToWriteInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';
import { mockRecruits } from '@/constants/checkbox';

export default function ReviewsToWrite() {
  const { fetchNextPage, hasNextPage, isFetching } =
    useReviewToWriteInfiniteQuery({ size: 8, includeCanceled: true });

  // const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];
  return (
    <InfinityScroll
      list={mockRecruits}
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
