import { GenreType, BandSessionType, GatheringStatus } from './tags';

export interface GatheringCard {
  id: number;
  name: string;
  place: string;
  thumbnail: string;
  gatheringDateTime: string;
  totalRecruit: number;
  totalCurrent: number;
  viewCount: number;
  recruitDeadline: string;
  status: GatheringStatus;
  genres: GenreType[];
  creator: {
    id: number;
    nickname: string;
  };
  sessions: {
    bandSession: BandSessionType;
    recruitCount: number;
    currentCount: number;
  }[];
}
