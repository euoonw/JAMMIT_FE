'use client';
import { useDeviceType } from '@/hooks/useDeviceType';
import { imgChange } from '@/utils/imgChange';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ThumbnailProps {
  thumbnail: string;
  alt: string;
  isFirst: boolean;
}

export default function Thumbnail({ thumbnail, alt, isFirst }: ThumbnailProps) {
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
      unoptimized
      width={343}
      height={200}
      loading={isFirst ? 'eager' : 'lazy'}
      priority={isFirst}
      sizes="(min-width:1344px) 25vw, 100vw"
      className="h-full w-full object-cover"
    />
  );
}
