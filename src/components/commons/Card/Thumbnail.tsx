import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ImgCard01 } from '@/assets/images';

interface ThumbnailProps {
  thumbnail: StaticImageData;
  alt: string;
}

export default function Thumbnail({
  // thumbnail,
  alt,
}: ThumbnailProps) {
  return <Image src={ImgCard01} alt={alt} width={320} height={200} />;
}
