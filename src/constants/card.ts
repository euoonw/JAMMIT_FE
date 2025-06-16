export const CARD_STATE = {
  COMPLETED: '신청완료',
  PROGRESS: '모집중',
  CONFIRMED: '합주확정',
  ENSEMBLE: '합주완료',
  CANCELED: '합주취소',
} as const;
export type CardStatus = (typeof CARD_STATE)[keyof typeof CARD_STATE];
