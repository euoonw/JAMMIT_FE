import { DeviceType } from '@/hooks/useDeviceType';

export const imgChange = (
  thumbnail: string,
  type: 'card' | 'banner',
  device: DeviceType = 'pc',
): string => {
  const isBannerImg = thumbnail.startsWith('img_banner_');
  const match = isBannerImg ? thumbnail.match(/\d+/) : null;
  const num = match ? match[0].padStart(2, '0') : '01';
  if (type === 'card') {
    return `/images/card/img_card_${device}_${num}.avif`;
  } else {
    return `/images/banner/img_banner_${num}.png`;
  }
};
