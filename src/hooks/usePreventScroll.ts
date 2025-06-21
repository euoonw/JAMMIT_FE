import { useEffect } from 'react';

export const usePreventScroll = (isActive: boolean) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isActive]);
};
