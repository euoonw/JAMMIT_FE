import { renderHook, act } from '@testing-library/react';
import { useQueryTab } from '../useQueryTab';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useQueryTab 훅 테스트', () => {
  const replace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace });
    replace.mockClear();
  });

  test('기본값을 반환해야 한다 (쿼리 없음)', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
      toString: () => '',
    });

    const { result } = renderHook(() =>
      useQueryTab('tab', 'home', ['home', 'profile']),
    );

    expect(result.current.activeTab).toBe('home');
  });

  test('유효한 탭을 반환해야 한다 (쿼리 있음)', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => 'profile',
      toString: () => 'tab=profile',
    });

    const { result } = renderHook(() =>
      useQueryTab('tab', 'home', ['home', 'profile']),
    );

    expect(result.current.activeTab).toBe('profile');
  });

  test('유효하지 않은 탭이면 기본값을 반환해야 한다', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => 'invalid',
      toString: () => 'tab=invalid',
    });

    const { result } = renderHook(() =>
      useQueryTab('tab', 'home', ['home', 'profile']),
    );

    expect(result.current.activeTab).toBe('home');
  });

  test('setTab을 호출하면 쿼리를 변경해야 한다', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => 'home',
      toString: () => 'tab=home',
    });

    const { result } = renderHook(() =>
      useQueryTab('tab', 'home', ['home', 'profile']),
    );

    act(() => {
      result.current.setTab('profile');
    });

    expect(replace).toHaveBeenCalledWith('?tab=profile');
  });
});
