'use client';
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
