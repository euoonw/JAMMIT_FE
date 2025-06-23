import { getReviewRead } from '@/lib/review/reviewRead';
import { getReviewWrites } from '@/lib/review/towrite';
import { RecruitResponse } from '@/types/recruit';
import { ReviewDetailResponse, ReviewRequest } from '@/types/review';
import {
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { gatheringKeys, userKeys } from '../queryKeys';

export const useReviewQuery = (
  { gatheringId, userId }: ReviewRequest,
  options?: Partial<UseQueryOptions<ReviewDetailResponse>>,
) => {
  return useQuery<ReviewDetailResponse>({
    queryKey: gatheringKeys
      .details(gatheringId)
      .participantReviewProfile(userId),
    queryFn: () => getReviewRead({ gatheringId, userId }),
    ...options,
  });
};

interface ReivewProps {
  size: number;
  includeCanceled: boolean;
  enabled?: boolean;
}

export const useReviewToWriteInfiniteQuery = ({
  size,
  includeCanceled,
  enabled = true,
}: ReivewProps) => {
  return useInfiniteQuery({
    queryKey: userKeys.myParticipatedGatherings({ size, includeCanceled }),
    queryFn: ({ pageParam = 0 }) =>
      getReviewWrites({ pageParam, size, includeCanceled }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: RecruitResponse) =>
      lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
