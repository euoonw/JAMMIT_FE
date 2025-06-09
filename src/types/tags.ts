export enum Genre {
  ROCK = 'ROCK',
  METAL = 'METAL',
  POP = 'POP',
  BALLAD = 'BALLAD',
  INDIE = 'INDIE',
  ALTERNATIVE = 'ALTERNATIVE',
  JAZZ = 'JAZZ',
  PUNK = 'PUNK',
  ACOUSTIC = 'ACOUSTIC',
  FOLK = 'FOLK',
  RNB = 'RNB',
  KEYBOARD = 'KEYBOARD',
}

export enum BandSession {
  VOCAL = 'VOCAL',
  ELECTRIC_GUITAR = 'ELECTRIC_GUITAR',
  DRUM = 'DRUM',
  ACOUSTIC_GUITAR = 'ACOUSTIC_GUITAR',
  BASS = 'BASS',
  STRING_INSTRUMENT = 'STRING_INSTRUMENT',
  PERCUSSION = 'PERCUSSION',
  KEYBOARD = 'KEYBOARD',
}

export type GatheringStatus =
  | 'RECRUITING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELED';

export type GenreType =
  | 'ROCK'
  | 'METAL'
  | 'POP'
  | 'BALLAD'
  | 'INDIE'
  | 'ALTERNATIVE'
  | 'JAZZ'
  | 'PUNK'
  | 'ACOUSTIC'
  | 'FOLK'
  | 'RNB';

export type BandSessionType =
  | 'VOCAL'
  | 'ELECTRIC_GUITAR'
  | 'DRUM'
  | 'ACOUSTIC_GUITAR'
  | 'BASS'
  | 'STRING_INSTRUMENT'
  | 'PERCUSSION'
  | 'KEYBOARD';

export type ParticipantStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELED';
