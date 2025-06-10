import React from 'react';
import Image from 'next/image';
import { imgChange } from '@/utils/imgChange';

interface ThumbnailProps {
  thumbnail: string;
  alt: string;
}

export default function Thumbnail({ thumbnail, alt }: ThumbnailProps) {
  return (
    <Image
      src={imgChange(thumbnail, 'card')}
      alt={alt}
      width={320}
      height={200}
    />
  );
}
