'use client';
import { useUserMeQuery } from '@/hooks/queries/user/useUserMeQuery';
import { getStatus } from '@/lib/review/received';
import { useQuery } from '@tanstack/react-query';

import ReviewStatusItem from './ReviewsReceived';
import SkeletonStatus from './SkeletonStatus';

export default function ReviewStatus() {
  const { data: user } = useUserMeQuery();
  const { data } = useQuery({
    queryKey: ['getStatus', user?.id],
    queryFn: getStatus,
  });
  if (!data) return <SkeletonStatus />;
  return <ReviewStatusItem data={data} />;
}
