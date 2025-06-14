'use client';

/**
 * useQueryTab hook은 브라우저 환경(클라이언트 사이드)에서만 동작
 * SSR 환경에서는 document가 없기 때문에 사용 시 주의하세요.
 */
import { useRouter, useSearchParams } from 'next/navigation';

export function useQueryTab<T extends string>(
  key: string,
  defaultValue: T,
  validTabs: T[],
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get(key) as T;
  const isValid = current && validTabs.includes(current);

  const activeTab = isValid ? current : defaultValue;

  const setTab = (tab: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, tab);
    router.push(`?${params.toString()}`);
  };

  return {
    activeTab,
    setTab,
  };
}
