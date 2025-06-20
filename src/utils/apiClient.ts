import { tokenService } from './tokenService';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 1,
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const accessToken = tokenService.getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401 && accessToken && retryCount > 0) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        return this.request<T>(endpoint, options, retryCount - 1);
      }
    }

    if (response.status === 403) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }

    const data = await response.json();

    // result를 바로 주는 경우
    if (!('success' in data)) {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return data as T;
    }

    // success, code, message, result 따로 주는 경우

    if (!data.success) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }
    return data.result;
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      if (data.success && data.result.accessToken) {
        tokenService.setAccessToken(data.result.accessToken);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '');
export const nestApiClient = new ApiClient(
  process.env.NEXT_PUBLIC_APP_URL_NEST || '',
);
