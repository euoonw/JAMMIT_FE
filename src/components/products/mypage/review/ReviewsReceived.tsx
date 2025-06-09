import { Suspense } from 'react';
import ReviewList from './ReviewList';
import ReviewStatus from './ReviewStatus';
import SkeletonReviewList from './SkeletonReviewList';
import SkeletonStatus from './SkeletonStatus';

export default function ReviewsReceived() {
  return (
    <div className="mt-5 flex items-start gap-5">
      <Suspense fallback={<SkeletonStatus />}>
        <ReviewStatus />
      </Suspense>
      <Suspense fallback={<SkeletonReviewList />}>
        <ReviewList />
      </Suspense>
    </div>
  );
}
