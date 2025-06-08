import { ReviewPros } from '@/types/review';

export const mockReviews: ReviewPros[] = Array.from({ length: 5 }).map(
  (_, i) => {
    const randomBool = () => Math.random() < 0.5;
    const nicknames = [
      '음치탈출러',
      '잼잘알',
      '기타요정',
      '비트박스러버',
      '베이시스트',
    ];
    const contents = [
      '"처음엔 낯설었지만 함께 연주할수록 편안해졌어요. 배려 깊은 연습 덕분에 즐겁고 따듯한 시간이었어요!"',
      '"매번 준비를 철저히 해와줘서 리허설이 안정감 있게 진행됐어요. 책임감 있는 모습이 인상적이었어요 😊"',
      '"모임 분위기를 자연스럽게 리드해줘서 모두가 편하게 합주할 수 있었어요. 이런 팀워크 정말 좋아요!"',
      '"악보도 빠르게 공유해주고, 연습 일정도 잘 챙겨줘서 수월하게 연습할 수 있었어요. 다음에도 꼭 함께하고 싶어요!"',
      '"혼자보다 같이 할 때 더 멋진 음악이 된다는 걸 느끼게 해주는 분이었어요. 성장하는 즐거움을 함께했어요 🎶"',
    ];
    const gatherings = [
      '홍대 합주모임',
      '재즈 프로젝트',
      '락밴드 초보모집',
      '어쿠스틱 모임',
      '잼연습 정기모임',
    ];

    return {
      id: i + 1,
      reviewerId: i + 100,
      reviewerNickname: nicknames[i],
      revieweeId: 1,
      revieweeNickname: '리뷰당한넘',
      score: 1,
      gatheringId: i + 200,
      gatheringName: gatherings[i],
      content: contents[i],

      isPracticeHelped: true,
      isGoodWithMusic: randomBool(),
      isGoodWithOthers: randomBool(),
      isSharesPracticeResources: randomBool(),
      isManagingWell: randomBool(),
      isHelpful: randomBool(),
      isGoodLearner: randomBool(),
      isKeepingPromises: randomBool(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
);

export const dummyReviewData = {
  goodWithMusicCount: 15,
  goodWithMusicPercentage: 75,

  practiceHelpedCount: 11,
  practiceHelpedPercentage: 55,

  keepingPromisesCount: 8,
  keepingPromisesPercentage: 40,

  goodWithOthersCount: 5,
  goodWithOthersPercentage: 25,

  managingWellCount: 4,
  managingWellPercentage: 20,

  sharesPracticeResourcesCount: 3,
  sharesPracticeResourcesPercentage: 15,

  helpfulCount: 2,
  helpfulPercentage: 10,

  goodLearnerCount: 1,
  goodLearnerPercentage: 5,
};

export const REVIEW_METRICS = [
  {
    key: 'isPracticeHelped',
    label: '연주',
    name: '연주 실력이 좋아요',
    countKey: 'goodWithMusicCount',
  },
  {
    key: 'isGoodWithMusic',
    label: '준비',
    name: '곡 준비를 잘 해왔어요',
    countKey: 'practiceHelpedCount',
  },
  {
    key: 'isKeepingPromises',
    label: '약속',
    name: '합주 시간 약속을 잘 지켜요',
    countKey: 'keepingPromisesCount',
  },
  {
    key: 'isGoodWithOthers',
    label: '호흡',
    name: '다른 파트와의 호흡이 잘 맞아요',
    countKey: 'goodWithOthersCount',
  },
  {
    key: 'isManagingWell',
    label: '팀워크',
    name: '분위기를 잘 이끌어요',
    countKey: 'managingWellCount',
  },
  {
    key: 'isSharesPracticeResources',
    label: '자료 공유',
    name: '악보나 연습 자료를 잘 공유해줬어요',
    countKey: 'sharesPracticeResourcesCount',
  },
  {
    key: 'isHelpful',
    label: '도움 됨',
    name: '팀워크가 좋고 함께 연주하기 편했어요',
    countKey: 'helpfulCount',
  },
  {
    key: 'isGoodLearner',
    label: '학습자',
    name: '빨리 배워서 잘 따라해줘요',
    countKey: 'goodLearnerCount',
  },
] as const;
