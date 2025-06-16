import { tokenService } from '@/utils/tokenService';
import { LoginRequest, SignupRequest } from '@/types/auth';
import { postLogin } from '@/lib/auth/login';
import { postSignup } from '@/lib/auth/signup';
import { queryClient } from '@/lib/react-query';
import { apiClient } from './apiClient';
import { useUserStore } from '@/stores/useUserStore';
import { useErrorModalStore } from '@/stores/useErrorModalStore';

export const login = async (loginRequest: LoginRequest): Promise<void> => {
  const result = await postLogin(loginRequest);

  tokenService.setAccessToken(result.accessToken);
  tokenService.setRefreshToken(result.refreshToken);

  useUserStore.getState().setUser(result.user);

  queryClient.invalidateQueries({ queryKey: ['me'] });
};

export const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await postSignup(signupRequest);
};

export const logout = async (): Promise<void> => {
  useUserStore.getState().clearUser();
  tokenService.clearAllTokens();
  queryClient.clear();
};

export const refreshAccessToken = async (): Promise<void> => {
  const store = useUserStore.getState();
  store.startRefresh();

  try {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      store.clearUser();
      tokenService.clearAllTokens();
    }

    const { accessToken } = await apiClient.post<{ accessToken: string }>(
      '/auth/refresh',
      { refreshToken },
    );

    tokenService.setAccessToken(accessToken);
    queryClient.invalidateQueries({ queryKey: ['me'] });
  } catch {
    useErrorModalStore
      .getState()
      .open('세션이 만료되었습니다. 다시 로그인 해주세요.');
    tokenService.clearAllTokens();
    store.clearUser();
  } finally {
    store.endRefresh();
  }
};
