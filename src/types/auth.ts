import { UserResponse } from '@/types/user';
import { BandSession, Genre } from './tags';

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  nickname: string;
  profileImagePath: string;
  preferredGenres: Genre[];
  preferredBandSessions: BandSession[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}
