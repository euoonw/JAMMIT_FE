import { motion } from 'framer-motion';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Liked({
  isLiked,
  onClick,
  className,
  children,
}: LikeButtonProps) {
  return (
    <motion.button
      className={className}
      aria-label="좋아요"
      animate={{ scale: isLiked ? 1 : 1 }}
      whileTap={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </motion.button>
  );
}
