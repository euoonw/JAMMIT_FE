'use client';
import IconLove from '@/assets/icons/ic_love.svg';
import { useWishStore } from '@/stores/useWishStore';
import { GatheringCard } from '@/types/card';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LikeProps {
  item: GatheringCard;
}

export default function Like({ item }: LikeProps) {
  const toggle = useWishStore((s) => s.toggle);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLiked = useWishStore((s) => s.isLiked(item.id));

  if (!isClient) return null;

  return (
    <motion.button
      className="absolute top-2 right-2 z-10"
      aria-label="좋아요"
      animate={{ scale: isLiked ? 1 : 1 }}
      whileTap={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      onClick={(e) => {
        e.preventDefault();
        toggle(item);
      }}
    >
      <IconLove
        className={`h-6 w-6 ${isLiked ? 'text-[color:var(--primary)]' : 'text-white'}`}
      />
    </motion.button>
  );
}
