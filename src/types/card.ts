import { StaticImageData } from 'next/image';
import { GenreType, BandSessionType, GatheringStatus } from './tags';

export interface RecruitCardData {
  id: number;
  name: string;
  thumbnail: StaticImageData;

  genres: string[];
  author: string;
  totalRecruit: number;
  totalCurrent: number;
  recruitDeadline: string;
  member: { name: string; personnel: number; total: number }[];
}

// TODO: 진환님 다음과 같이 맞혀야될것 같아요
export interface GatheringCard {
  /** 모임 id */
  id: number;
  /** 모임 이름 */
  name: string;
  /** 모임 장소 */
  place: string;
  /** 썸네일 */
  thumbnail: string;
  /** 모임 날짜 */
  gatheringDateTime: string;
  /** 전체 멤버수 */
  totalRecruit: number;
  /** 현재 멤버수 */
  totalCurrent: number;
  /** ?? */
  viewCount: number;
  /** 모집 마감 날짜 */
  recruitDeadline: string;
  /** 모임 상태 */
  status: GatheringStatus;
  /** 장르 */
  genres: GenreType[];
  /** 작성자 */
  creator: {
    id: number;
    nickname: string;
  };
  /** 세션 */
  sessions: {
    bandSession: BandSessionType;
    recruitCount: number;
    currentCount: number;
  };
}
