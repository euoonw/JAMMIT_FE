'use client';

import { useReviewQuery } from '@/hooks/queries/review/usePrefetchReview';
import { ReviewRequest } from '@/types/review';
import VirtualGrid from '../../commons/VirtualGrid';
import ReviewItems from '../mypage/review/ReviewItems';
import ReviewStatusItem from '../mypage/review/ReviewsReceived';
import SkeletonReviewList from '../mypage/review/SkeletonReviewList';
import SkeletonStatus from '../mypage/review/SkeletonStatus';
import SkeletonUserCard from '../mypage/SkeletonUserCard';
import UserCardItem from '../mypage/UserCardItem';

export default function ReviewPageClient({
  gatheringId,
  userId,
}: ReviewRequest) {
  const { data, isLoading } = useReviewQuery({ gatheringId, userId });
  if (!data || isLoading) {
    return (
      <div>
        <SkeletonUserCard />
        <div className="pc:max-w-[84rem] mx-auto flex items-start gap-5">
          <SkeletonStatus />
          <SkeletonReviewList />
        </div>
      </div>
    );
  }
  return (
    <div>
      <UserCardItem user={data.userInfo} type="review" />
      <div className="pc:max-w-[84rem] mx-auto my-10 flex items-start gap-5">
        <ReviewStatusItem data={data.statistics} />
        <VirtualGrid
          className="flex flex-auto"
          list={data.reviews}
          variant="list"
          item={(item) => <ReviewItems key={item.id} item={item} />}
          emptyText="아직 리뷰가 없습니다."
        />
      </div>
    </div>
  );
}
