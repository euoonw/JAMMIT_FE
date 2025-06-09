import { ReviewItem } from '@/types/review';

export const mockReviews: ReviewItem[] = Array.from({ length: 5 }).map(
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
      gatheringId: i + 200,
      gatheringName: gatherings[i],
      content: contents[i],

      practiceHelped: true,
      goodWithMusic: randomBool(),
      goodWithOthers: randomBool(),
      sharesPracticeResources: randomBool(),
      managingWell: randomBool(),
      helpful: randomBool(),
      goodLearner: randomBool(),
      keepingPromises: randomBool(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
);

export const dummyReviewData = {
  goodWithMusicCount: 0,
  goodWithMusicPercentage: 0,

  practiceHelpedCount: 0,
  practiceHelpedPercentage: 0,

  keepingPromisesCount: 0,
  keepingPromisesPercentage: 0,

  goodWithOthersCount: 0,
  goodWithOthersPercentage: 0,

  managingWellCount: 0,
  managingWellPercentage: 0,

  sharesPracticeResourcesCount: 0,
  sharesPracticeResourcesPercentage: 0,

  helpfulCount: 0,
  helpfulPercentage: 0,

  goodLearnerCount: 0,
  goodLearnerPercentage: 0,
};

export const REVIEW_METRICS = [
  {
    key: 'practiceHelped',
    label: '연주를 잘해요',
    name: '연주 실력이 좋아요',
    countKey: 'goodWithMusicCount',
  },
  {
    key: 'goodWithMusic',
    label: '준비가 철저해요',
    name: '곡 준비를 잘 해왔어요',
    countKey: 'practiceHelpedCount',
  },
  {
    key: 'keepingPromises',
    label: '시간을 잘 지켜요',
    name: '합주 시간 약속을 잘 지켜요',
    countKey: 'keepingPromisesCount',
  },
  {
    key: 'goodWithOthers',
    label: '호흡이 좋아요',
    name: '다른 파트와의 호흡이 잘 맞아요',
    countKey: 'goodWithOthersCount',
  },
  {
    key: 'managingWell',
    label: '분위기메이커',
    name: '분위기를 잘 이끌어요',
    countKey: 'managingWellCount',
  },
  {
    key: 'sharesPracticeResources',
    label: '배려가 넘쳐요',
    name: '볼륨이나 톤을 배려해줘요',
    countKey: 'sharesPracticeResourcesCount',
  },
  {
    key: 'helpful',
    label: '팀워크가 좋아요',
    name: '팀워크가 좋고 함께 연주하기 편했어요',
    countKey: 'helpfulCount',
  },
  {
    key: 'goodLearner',
    label: '빨리 배워요',
    name: '빨리 배워서 잘 따라해줘요',
    countKey: 'goodLearnerCount',
  },
] as const;
