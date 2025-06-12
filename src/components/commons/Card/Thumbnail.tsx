import { imgChange } from '@/utils/imgChange';
import Image from 'next/image';

interface ThumbnailProps {
  thumbnail: string;
  alt: string;
}

export default function Thumbnail({ thumbnail, alt }: ThumbnailProps) {
  return (
    <Image
      src={imgChange(thumbnail, 'card')}
      alt={alt}
      fill
      className="pc:aspect-[8/5] tab:aspect-[87/25] aspect-[343/200] rounded-lg object-cover"
      loading="eager"
    />
  );
}
