'use client';
import IconLove from '@/assets/icons/ic_love.svg';
import { useWishStore } from '@/stores/useWishStore';
import { GatheringCard } from '@/types/card';
import Liked from '../Liked';

interface LikeProps {
  item: GatheringCard;
}

export default function Like({ item }: LikeProps) {
  const toggle = useWishStore((s) => s.toggle);
  const isLiked = useWishStore((s) => s.isLiked(item.id));

  return (
    <Liked
      isLiked={isLiked}
      onClick={() => toggle(item)}
      className="absolute top-2 right-2 z-10"
    >
      <IconLove
        className={`h-6 w-6 ${isLiked ? 'text-[color:var(--primary)]' : 'text-white'}`}
      />
    </Liked>
  );
}
