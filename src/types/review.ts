import { BandSession } from './tags';

export interface ReviewItem {
  id: number;
  reviewerId: number;
  reviewerNickname: string;
  reviewerBandSessions: BandSession[];
  revieweeId: number;
  revieweeNickname: string;
  gatheringId: number;
  gatheringName: string;
  gatheringThumbnail: string;
  gatheringHostNickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  practiceHelped: boolean;
  goodWithMusic: boolean;
  goodWithOthers: boolean;
  sharesPracticeResources: boolean;
  managingWell: boolean;
  helpful: boolean;
  goodLearner: boolean;
  keepingPromises: boolean;
}

export interface ReviewStatusPros {
  totalReviews: number;
  practiceHelpedCount: number;
  goodWithMusicCount: number;
  goodWithOthersCount: number;
  sharesPracticeResourcesCount: number;
  managingWellCount: number;
  helpfulCount: number;
  goodLearnerCount: number;
  keepingPromisesCount: number;
  practiceHelpedPercentage: number;
  goodWithMusicPercentage: number;
  goodWithOthersPercentage: number;
  sharesPracticeResourcesPercentage: number;
  managingWellPercentage: number;
  helpfulPercentage: number;
  goodLearnerPercentage: number;
  keepingPromisesPercentage: number;
}

export interface ReviewResponse {
  content: ReviewItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PostReviewRequest {
  revieweeId: number;
  gatheringId: number;
  content: string;
  isPracticeHelped: boolean;
  isGoodWithMusic: boolean;
  isGoodWithOthers: boolean;
  isSharesPracticeResources: boolean;
  isManagingWell: boolean;
  isHelpful: boolean;
  isGoodLearner: boolean;
  isKeepingPromises: boolean;
}
