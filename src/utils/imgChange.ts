import {
  ImgBanner01,
  ImgBanner02,
  ImgBanner03,
  ImgBanner04,
  ImgBanner05,
  ImgBanner06,
  ImgBanner07,
  ImgBanner08,
  ImgBanner09,
  ImgBanner10,
  ImgBanner11,
  ImgBanner12,
  ImgBanner13,
  ImgBanner14,
  ImgBanner15,
  ImgBanner16,
  ImgBanner17,
  ImgBanner18,
} from '@/assets/images/banner';
import {
  ImgMobCard01,
  ImgMobCard02,
  ImgMobCard03,
  ImgMobCard04,
  ImgMobCard05,
  ImgMobCard06,
  ImgMobCard07,
  ImgMobCard08,
  ImgMobCard09,
  ImgMobCard10,
  ImgMobCard11,
  ImgMobCard12,
  ImgMobCard13,
  ImgMobCard14,
  ImgMobCard15,
  ImgMobCard16,
  ImgMobCard17,
  ImgMobCard18,
  ImgPcCard01,
  ImgPcCard02,
  ImgPcCard03,
  ImgPcCard04,
  ImgPcCard05,
  ImgPcCard06,
  ImgPcCard07,
  ImgPcCard08,
  ImgPcCard09,
  ImgPcCard10,
  ImgPcCard11,
  ImgPcCard12,
  ImgPcCard13,
  ImgPcCard14,
  ImgPcCard15,
  ImgPcCard16,
  ImgPcCard17,
  ImgPcCard18,
  ImgTabCard01,
  ImgTabCard02,
  ImgTabCard03,
  ImgTabCard04,
  ImgTabCard05,
  ImgTabCard06,
  ImgTabCard07,
  ImgTabCard08,
  ImgTabCard09,
  ImgTabCard10,
  ImgTabCard11,
  ImgTabCard12,
  ImgTabCard13,
  ImgTabCard14,
  ImgTabCard15,
  ImgTabCard16,
  ImgTabCard17,
  ImgTabCard18,
} from '@/assets/images/card';
import { StaticImageData } from 'next/image';

export type DeviceType = 'pc' | 'tab' | 'mob';

// 카드용
const reactionCardImageMap: Record<
  string,
  Record<DeviceType, StaticImageData>
> = {
  img_card01: {
    pc: ImgPcCard01,
    tab: ImgTabCard01,
    mob: ImgMobCard01,
  },
  img_card02: {
    pc: ImgPcCard02,
    tab: ImgTabCard02,
    mob: ImgMobCard02,
  },
  img_card03: {
    pc: ImgPcCard03,
    tab: ImgTabCard03,
    mob: ImgMobCard03,
  },
  img_card04: {
    pc: ImgPcCard04,
    tab: ImgTabCard04,
    mob: ImgMobCard04,
  },
  img_card05: {
    pc: ImgPcCard05,
    tab: ImgTabCard05,
    mob: ImgMobCard05,
  },
  img_card06: {
    pc: ImgPcCard06,
    tab: ImgTabCard06,
    mob: ImgMobCard06,
  },
  img_card07: {
    pc: ImgPcCard07,
    tab: ImgTabCard07,
    mob: ImgMobCard07,
  },
  img_card08: {
    pc: ImgPcCard08,
    tab: ImgTabCard08,
    mob: ImgMobCard08,
  },
  img_card09: {
    pc: ImgPcCard09,
    tab: ImgTabCard09,
    mob: ImgMobCard09,
  },
  img_card10: {
    pc: ImgPcCard10,
    tab: ImgTabCard10,
    mob: ImgMobCard10,
  },
  img_card11: {
    pc: ImgPcCard11,
    tab: ImgTabCard11,
    mob: ImgMobCard11,
  },
  img_card12: {
    pc: ImgPcCard12,
    tab: ImgTabCard12,
    mob: ImgMobCard12,
  },
  img_card13: {
    pc: ImgPcCard13,
    tab: ImgTabCard13,
    mob: ImgMobCard13,
  },
  img_card14: {
    pc: ImgPcCard14,
    tab: ImgTabCard14,
    mob: ImgMobCard14,
  },
  img_card15: {
    pc: ImgPcCard15,
    tab: ImgTabCard15,
    mob: ImgMobCard15,
  },
  img_card16: {
    pc: ImgPcCard16,
    tab: ImgTabCard16,
    mob: ImgMobCard16,
  },
  img_card17: {
    pc: ImgPcCard17,
    tab: ImgTabCard17,
    mob: ImgMobCard17,
  },
  img_card18: {
    pc: ImgPcCard18,
    tab: ImgTabCard18,
    mob: ImgMobCard18,
  },
};

// 배너용
const reactionBannerImageMap: Record<
  string,
  Record<DeviceType, StaticImageData>
> = {
  img_banner_01: {
    pc: ImgBanner01,
    tab: ImgBanner01,
    mob: ImgBanner01,
  },
  img_banner_02: {
    pc: ImgBanner02,
    tab: ImgBanner02,
    mob: ImgBanner02,
  },
  img_banner_03: {
    pc: ImgBanner03,
    tab: ImgBanner03,
    mob: ImgBanner03,
  },
  img_banner_04: {
    pc: ImgBanner04,
    tab: ImgBanner04,
    mob: ImgBanner04,
  },
  img_banner_05: {
    pc: ImgBanner05,
    tab: ImgBanner05,
    mob: ImgBanner05,
  },
  img_banner_06: {
    pc: ImgBanner06,
    tab: ImgBanner06,
    mob: ImgBanner06,
  },
  img_banner_07: {
    pc: ImgBanner07,
    tab: ImgBanner07,
    mob: ImgBanner07,
  },
  img_banner_08: {
    pc: ImgBanner08,
    tab: ImgBanner08,
    mob: ImgBanner08,
  },
  img_banner_09: {
    pc: ImgBanner09,
    tab: ImgBanner09,
    mob: ImgBanner09,
  },
  img_banner_10: {
    pc: ImgBanner10,
    tab: ImgBanner10,
    mob: ImgBanner10,
  },
  img_banner_11: {
    pc: ImgBanner11,
    tab: ImgBanner11,
    mob: ImgBanner11,
  },
  img_banner_12: {
    pc: ImgBanner12,
    tab: ImgBanner12,
    mob: ImgBanner12,
  },
  img_banner_13: {
    pc: ImgBanner13,
    tab: ImgBanner13,
    mob: ImgBanner13,
  },
  img_banner_14: {
    pc: ImgBanner14,
    tab: ImgBanner14,
    mob: ImgBanner14,
  },
  img_banner_15: {
    pc: ImgBanner15,
    tab: ImgBanner15,
    mob: ImgBanner15,
  },
  img_banner_16: {
    pc: ImgBanner16,
    tab: ImgBanner16,
    mob: ImgBanner16,
  },
  img_banner_17: {
    pc: ImgBanner17,
    tab: ImgBanner17,
    mob: ImgBanner17,
  },
  img_banner_18: {
    pc: ImgBanner18,
    tab: ImgBanner18,
    mob: ImgBanner18,
  },
};

// 반응형 감지
const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'pc';
  const width = window.innerWidth;
  if (width >= 1344) return 'pc';
  if (width >= 744) return 'tab';
  return 'mob';
};
export const imgChange = (
  thumbnail: string,
  type: 'card' | 'banner',
): StaticImageData => {
  const device = getDeviceType();
  const isBannerImg = thumbnail.startsWith('img_banner_');
  const match = isBannerImg ? thumbnail.match(/\d+/) : null;
  const num = match ? match[0].padStart(2, '0') : '01';
  const map = type === 'card' ? reactionCardImageMap : reactionBannerImageMap;
  const key = type === 'card' ? `img_card${num}` : `img_banner_${num}`;

  return (
    map?.[key]?.[device] ??
    map?.[type === 'card' ? 'img_card01' : 'img_banner_01']?.[device]
  );
};
