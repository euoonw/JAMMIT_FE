'use client';

import { useEffect } from 'react';
import { refreshAccessToken } from '@/utils/authService';
import { tokenService } from '@/utils/tokenService';
import { useUserStore } from '@/stores/useUserStore';

export const useRefreshToken = () => {
  const store = useUserStore.getState();
  useEffect(() => {
    const access = tokenService.getAccessToken();
    const refresh = tokenService.getRefreshToken();

    if (access) {
      store.setLoaded();
      return;
    }

    if (!refresh) {
      store.setLoaded();
      return;
    }

    refreshAccessToken().catch((error) => {
      console.error('토큰 갱신 실패', error);
    });
  }, []);
};
