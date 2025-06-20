export const gatheringKeys = {
  all: ['gatherings'] as const,

  // 전체 모임 목록
  list: (filters: {
    size?: number;
    sort?: string;
    genres?: string[];
    sessions?: string[];
  }) => [...gatheringKeys.all, 'list', filters] as const,

  // 개별 모임
  details: (id: number) => ({
    // 모임 상세
    detail: [...gatheringKeys.all, id, 'detail'] as const,
    // 모임의 리뷰 목록
    reviews: [...gatheringKeys.all, id, 'reviews'] as const,
    // 모임 참가자 목록
    participants: [...gatheringKeys.all, id, 'participants'] as const,
    // 모임 참가자의 통합 리뷰 통계, 프로필 조회
    participantReviewProfile: (userId: number) =>
      [
        ...gatheringKeys.all,
        id,
        'participants',
        userId,
        'reviewProfile',
      ] as const,
  }),
};

export const userKeys = {
  base: ['user'] as const,

  // 로그인한 사용자 정보
  me: () => [...userKeys.base, 'me'] as const,

  // 내가 생성한 모임 목록
  myCreatedGatherings: (filters: {
    page?: number | undefined;
    size?: number | undefined;
    includeCanceled: boolean | undefined;
  }) => [...userKeys.base, 'gatherings', 'created', filters] as const,

  // 내가 신청한 모임 목록
  myParticipatedGatherings: (filters: {
    page?: number | undefined;
    size?: number | undefined;
    includeCanceled: boolean | undefined;
  }) => [...userKeys.base, 'gatherings', 'participated', filters] as const,

  // 내 리뷰 관련
  reviews: {
    // 내가 작성한 리뷰
    written: () => [...userKeys.base, 'reviews', 'written'] as const,
    // 내가 작성하지 않은 참가자 목록
    unwritten: () => [...userKeys.base, 'reviews', 'unwritten'] as const,
    // 내가 받은 리뷰 목록
    received: () => [...userKeys.base, 'reviews', 'received'] as const,
    // 받은 리뷰 평가항목별 통계 정보
    statistics: () =>
      [...userKeys.base, 'reviews', 'received', 'statistics'] as const,
  },

  // 영상 관련
  uploadedVideos: (userId?: string) =>
    userId
      ? ([...userKeys.base, 'videos', userId] as const)
      : ([...userKeys.base, 'videos', 'me'] as const),
};

export const videoKeys = {
  all: ['videos'] as const,

  // 전체 영상 리스트
  list: (filters: { page?: number; take?: number; order?: string }) =>
    [...videoKeys.all, 'list', filters] as const,

  // 영상 상세
  detail: (videoId: number) => [...videoKeys.all, 'detail', videoId] as const,
};
