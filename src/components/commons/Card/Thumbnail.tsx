'use client';
import { useDeviceType } from '@/hooks/useDeviceType';
import { imgChange } from '@/utils/imgChange';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ThumbnailProps {
  thumbnail: string;
  alt: string;
}

export default function Thumbnail({ thumbnail, alt }: ThumbnailProps) {
  const device = useDeviceType();
  const [imgSrc, setImgSrc] = useState<string>(
    imgChange(thumbnail, 'card', 'pc'),
  );
  useEffect(() => {
    const updated = imgChange(thumbnail, 'card', device);
    setImgSrc(updated);
  }, [device, thumbnail]);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="pc:aspect-[8/5] tab:aspect-[87/25] aspect-[343/200] rounded-lg object-cover"
      loading="eager"
      priority
      sizes="(min-width: 1344px) 1344px, (min-width: 744px) 744px, 100vw"
    />
  );
}
