'use client';
import { getStatus } from '@/lib/review/received';
import { useQuery } from '@tanstack/react-query';

import ReviewStatusItem from './ReviewsReceived';
import SkeletonStatus from './SkeletonStatus';
import { userKeys } from '@/hooks/queries/queryKeys';
import { useUserStore } from '@/stores/useUserStore';

export default function ReviewStatus() {
  const { user, isLoaded, isRefreshing } = useUserStore();
  const isQueryReady = isLoaded && !isRefreshing && !!user;
  const { data } = useQuery({
    queryKey: userKeys.reviews.statistics(),
    queryFn: getStatus,
    enabled: isQueryReady,
  });
  if (!data) return <SkeletonStatus />;
  return <ReviewStatusItem data={data} />;
}
