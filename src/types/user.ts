import { BandSession, Genre } from './tags';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  nickname: string;
  profileImagePath: string;
  createdAt: string;
  updatedAt: string;
  preferredGenres: Genre[];
  preferredBandSessions: BandSession[];
  totalCreatedGatheringCount: number;
  completedGatheringCount: number;
}

export interface UpdateProfileRequest {
  email: string;
  username: string;
  password: string | null;
  preferredGenres: Genre[];
  preferredBandSessions: BandSession[];
}

export interface UpdateProfileResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    username: string;
    email: string;
    nickname: string;
    profileImagePath: string;
    createdAt: string;
    updatedAt: string;
    preferredGenres: Genre[];
    preferredBandSessions: BandSession[];
  };
}

export interface UpdateProfileImageRequest {
  orgFileName: string;
  profileImagePath: string;
}
