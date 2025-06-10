import { BandSessionType } from '@/types/tags';

export const GENRE_TAGS = [
  '락',
  '메탈',
  '팝',
  '발라드',
  'R&B',
  '인디',
  '얼터너티브',
  '재즈',
  '펑크',
  '어쿠스틱',
  '포크',
];

export const SESSION_TAGS = [
  '보컬',
  '일렉기타',
  '통기타',
  '베이스',
  '건반',
  '드럼',
  '타악기',
  '현악기',
];

export const SESSION_KEY_MAP: { [korean: string]: BandSessionType } = {
  보컬: 'VOCAL',
  일렉기타: 'ELECTRIC_GUITAR',
  통기타: 'ACOUSTIC_GUITAR',
  베이스: 'BASS',
  건반: 'KEYBOARD',
  드럼: 'DRUM',
  타악기: 'PERCUSSION',
  현악기: 'STRING_INSTRUMENT',
};

export interface InstrumentCount {
  electricGuitar: number;
  acousticGuitar: number;
  bass: number;
  drum: number;
  vocal: number;
  keyboard: number;
  percussion: number;
  string: number;
}
