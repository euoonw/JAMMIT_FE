import { getReviewRead } from '@/lib/review/reviewRead';
import { getReviewWrites } from '@/lib/review/towrite';
import { RecruitResponse } from '@/types/recruit';
import { ReviewRequest } from '@/types/review';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { gatheringKeys, userKeys } from '../queryKeys';

export const useReviewQuery = ({ gatheringId, userId }: ReviewRequest) => {
  return useQuery({
    queryKey: gatheringKeys
      .details(gatheringId)
      .participantReviewProfile(userId),
    queryFn: () => getReviewRead({ gatheringId, userId }),
  });
};

interface ReivewProps {
  size: number;
  includeCanceled: boolean;
}

export const useReviewToWriteInfiniteQuery = ({
  size,
  includeCanceled,
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
  });
};
