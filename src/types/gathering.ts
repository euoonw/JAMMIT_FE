import {
  BandSessionType,
  GatheringStatus,
  GenreType,
  ParticipantStatus,
} from './tags';

export interface GatheringSessionInfo {
  bandSession: BandSessionType;
  recruitCount: number;
  currentCount: number;
}

export interface CreatorInfo {
  id: number;
  nickname: string;
}

export interface GatheringDetailResponse {
  id: number;
  name: string;
  thumbnail: string;
  place: string;
  description: string;
  gatheringDateTime: string;
  recruitDeadline: string;
  status: GatheringStatus;
  genres: GenreType[];
  sessions: GatheringSessionInfo[];
  creator: CreatorInfo;
}

export interface Participant {
  participantId: number;
  userId: number;
  userNickname: string;
  userEmail: string;
  bandSession: BandSessionType;
  status: ParticipantStatus;
  createdAt: string;
  introduction: string;
  profileImagePath: string;
}

export interface ParticipantsResponse {
  participants: Participant[];
  total: number;
}

export interface ParticipateGatheringResponse {
  gatheringId: number;
  userId: number;
  bandSession: BandSessionType;
  status: ParticipantStatus;
  message: string;
  completed: boolean;
  canceled: boolean;
  approved: boolean;
  rejected: boolean;
  pending: boolean;
}
