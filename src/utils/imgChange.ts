import { StaticImageData } from 'next/image';
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
  ImgCard01,
  ImgCard02,
  ImgCard03,
  ImgCard04,
  ImgCard05,
  ImgCard06,
  ImgCard07,
  ImgCard08,
  ImgCard09,
  ImgCard10,
  ImgCard11,
  ImgCard12,
} from '@/assets/images';

const imageMap: Record<string, StaticImageData> = {
  img_card01: ImgCard01,
  img_card02: ImgCard02,
  img_card03: ImgCard03,
  img_card04: ImgCard04,
  img_card05: ImgCard05,
  img_card06: ImgCard06,
  img_card07: ImgCard07,
  img_card08: ImgCard08,
  img_card09: ImgCard09,
  img_card10: ImgCard10,
  img_card11: ImgCard11,
  img_card12: ImgCard12,
  img_banner_01: ImgBanner01,
  img_banner_02: ImgBanner02,
  img_banner_03: ImgBanner03,
  img_banner_04: ImgBanner04,
  img_banner_05: ImgBanner05,
  img_banner_06: ImgBanner06,
  img_banner_07: ImgBanner07,
  img_banner_08: ImgBanner08,
  img_banner_09: ImgBanner09,
  img_banner_10: ImgBanner10,
  img_banner_11: ImgBanner11,
  img_banner_12: ImgBanner12,
};

export const imgChange = (
  thumbnail: string,
  type: 'card' | 'banner',
): StaticImageData => {
  const isBannerImg = thumbnail.startsWith('img_banner_');
  const match = isBannerImg ? thumbnail.match(/img_banner_(\d+)/) : null;
  const num = match ? match[1].padStart(2, '0') : '01';

  const key = type === 'card' ? `img_card${num}` : `img_banner_${num}`;

  return (
    imageMap[key] ?? imageMap[type === 'card' ? 'img_card01' : 'img_banner_01']
  );
};
