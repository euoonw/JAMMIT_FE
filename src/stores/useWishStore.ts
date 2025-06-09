import { RecruitCardData } from '@/types/card';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishState {
  items: RecruitCardData[];
  toggle: (item: RecruitCardData) => void;
  isLiked: (id: number) => boolean;
}
export const useWishStore = create<WishState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exist = get().items.find((i) => i.id === item.id);
        const update = exist
          ? get().items.filter((i) => i.id !== item.id)
          : [...get().items, item];
        set({ items: update });
      },
      isLiked: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'wish',
    },
  ),
);
