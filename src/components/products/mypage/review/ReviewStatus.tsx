'use client';
import { getStatus } from '@/lib/review/received';
import { useQuery } from '@tanstack/react-query';

import ReviewStatusItem from './ReviewsReceived';
import SkeletonStatus from './SkeletonStatus';
import { userKeys } from '@/hooks/queries/queryKeys';

export default function ReviewStatus() {
  const { data } = useQuery({
    queryKey: userKeys.reviews.statistics(),
    queryFn: getStatus,
  });
  if (!data) return <SkeletonStatus />;
  return <ReviewStatusItem data={data} />;
}
