import { GatheringCard } from './card';
import { BandSession, Genre } from './tags';

export interface RecruitPageProps {
  defaultGenres: Genre[];
  defaultSessions: BandSession[];
}

export interface Page {
  currentPage: number;
  totalPage: number;
}

export interface WishResponse {
  gatherings: GatheringCard[];
  currentPage: number;
  totalPage: number;
  totalElements: number;
}
