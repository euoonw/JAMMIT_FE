import { GatheringCard } from '@/types/card';
import { BandSession, Genre } from '@/types/tags';

export const GENRE_OPTIONS = [
  { label: '락', value: Genre.ROCK },
  { label: '메탈', value: Genre.METAL },
  { label: '팝', value: Genre.POP },
  { label: '발라드', value: Genre.BALLAD },
  { label: 'R&B', value: Genre.RNB },
  { label: '인디', value: Genre.INDIE },
  { label: '얼터너티브', value: Genre.ALTERNATIVE },
  { label: '재즈', value: Genre.JAZZ },
  { label: '펑크', value: Genre.PUNK },
  { label: '어쿠스틱', value: Genre.ACOUSTIC },
  { label: '포크', value: Genre.FOLK },
];
export const SESSION_OPTIONS = [
  { label: '보컬', value: BandSession.VOCAL },
  { label: '일렉기타', value: BandSession.ELECTRIC_GUITAR },
  { label: '통기타', value: BandSession.ACOUSTIC_GUITAR },
  { label: '베이스', value: BandSession.BASS },
  { label: '건반', value: BandSession.KEYBOARD },
  { label: '드럼', value: BandSession.DRUM },
  { label: '타악기', value: BandSession.PERCUSSION },
  { label: '현악기', value: BandSession.STRING_INSTRUMENT },
];

const baseMock: GatheringCard = {
  id: 0,
  name: '기본 제목',
  creator: {
    id: 1,
    nickname: '기본 작성자',
  },
  genres: [Genre.ROCK, Genre.POP],
  thumbnail: 'img_banner_01',
  totalRecruit: 5,
  totalCurrent: 3,
  recruitDeadline: '2025-07-01T23:59:59.000Z',
  sessions: [
    { bandSession: BandSession.VOCAL, currentCount: 1, recruitCount: 1 },
    {
      bandSession: BandSession.ACOUSTIC_GUITAR,
      currentCount: 1,
      recruitCount: 2,
    },
  ],
  place: '신촌',
  gatheringDateTime: '2025-07-01T23:59:59.000Z',
  viewCount: 1,
  status: 'RECRUITING',
};

export const mockRecruits: GatheringCard[] = Array.from({ length: 40 }).map(
  (_, i) => {
    const thumbnails = [
      'img_banner_01',
      'img_banner_02',
      'img_banner_03',
      'img_banner_04',
      'img_banner_05',
      'img_banner_06',
      'img_banner_07',
      'img_banner_08',
      'img_banner_09',
      'img_banner_10',
      'img_banner_11',
      'img_banner_12',
    ];
    const names = [
      '펑크 밴드 모집',
      '재즈 모임 구함',
      '홍대 밴드 연습',
      '합주 같이해요',
    ];
    const authors = ['몽글몽글', '하이텐션', '잼잼러', '루프탑'];

    return {
      ...baseMock,
      id: i + 1,
      name: `[${i + 1}] ${names[i % names.length]}`,
      author: authors[i % authors.length],
      thumbnail: thumbnails[i % thumbnails.length],
      totalCurrent: (i % 5) + 1,
    };
  },
);
