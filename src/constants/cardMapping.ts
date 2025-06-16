import { CARD_STATE, CardStatus } from '@/constants/card';
import { GatheringStatus } from '@/types/tags';

export const STATUS_ENUM_TO_KR = (status: GatheringStatus): CardStatus => {
  switch (status) {
    case 'RECRUITING':
      return CARD_STATE.PROGRESS;
    case 'CONFIRMED':
      return CARD_STATE.CONFIRMED;
    case 'COMPLETED':
      return CARD_STATE.ENSEMBLE;
    case 'CANCELED':
      return CARD_STATE.CANCELED;
    default:
      return CARD_STATE.PROGRESS;
  }
};
