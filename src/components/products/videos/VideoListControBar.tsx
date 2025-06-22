'use client';
import IcSort from '@/assets/icons/ic_sort.svg';
import Button from '@/components/commons/Button';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useRouter } from 'next/navigation';

interface VideoListControlBarProps {
  sort: 'latest' | 'popular';
  setSort: (sort: 'latest' | 'popular') => void;
}

export default function VideoListControlBar({
  sort,
  setSort,
}: VideoListControlBarProps) {
  const router = useRouter();
  const sortLabel = sort === 'latest' ? '최신순' : '인기순';
  const device = useDeviceType();

  const toggleSort = () => {
    setSort(sort === 'latest' ? 'popular' : 'latest');
  };

  return (
    <div className="tab:px-[1.5rem] pc:px-0 pc:justify-between pc:mt-[3.75rem] pc:mb-[2rem] my-[1.25rem] flex w-full px-[1rem]">
      <button
        aria-label={`정렬: ${sortLabel}`}
        onClick={toggleSort}
        className="pc:h-10 pc:w-[6.875rem] pc:gap-1 pc:rounded-lg pc:text-sm flex h-9 w-9 items-center justify-center gap-0 rounded-xl bg-[var(--gray-100)]"
      >
        <IcSort />
        {device === 'pc' && sortLabel}
      </button>
      <Button
        variant="solid"
        className="pc:static pc:w-[9.25rem] tab:w-[calc(100%-48px)] fixed bottom-[1.375rem] z-30 h-11 w-[calc(100%-32px)] text-center leading-11"
        onClick={() => router.push('/video/upload')}
        aria-label="재밋후기 글 작성 페이지로 이동"
      >
        글 작성
      </Button>
    </div>
  );
}
