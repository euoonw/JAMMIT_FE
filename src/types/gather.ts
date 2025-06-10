import { GatheringCard } from '@/types/card';
import { GenreType, BandSessionType, GatheringStatus } from './tags';

export interface GatheringsResponse {
  gatherings: GatheringCard[];
  currentPage: number;
  totalPage: number;
  totalElements: number;
}

export interface GetUserGatheringsParams {
  page: number;
  size: number;
  includeCanceled?: boolean;
}
export interface RegisterGatheringsRequest {
  name: string;
  thumbnail: string;
  place: string;
  description: string;
  gatheringDateTime: string;
  recruitDateTime: string;
  genres: GenreType[];
  status: GatheringStatus;
  totalRecruitCount: number;
  gatheringSessions: {
    bandSession: BandSessionType;
    recruitCount: number;
  }[];
}

export interface RegisterGatheringsResponse {
  id: number;
  name: string;
  message: string;
  gatheringDateTime: string;
  recruitDeadline: string;
  thumbnail: string;
  status: GatheringStatus;
}
