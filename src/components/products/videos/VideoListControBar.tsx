'use client';
import IcSort from '@/assets/icons/ic_sort.svg';
import Button from '@/components/commons/Button';
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

  const toggleSort = () => {
    setSort(sort === 'latest' ? 'popular' : 'latest');
  };

  return (
    <div className="mt-[3.75rem] mb-[2rem] flex w-full justify-between">
      <button
        aria-label={`정렬: ${sortLabel}`}
        onClick={toggleSort}
        className="pc:h-10 pc:w-[6.875rem] pc:gap-1 pc:rounded-lg pc:text-sm flex h-9 w-9 items-center justify-center gap-0 rounded-xl bg-[var(--gray-100)]"
      >
        <IcSort />
        {sortLabel}
      </button>
      <Button
        variant="solid"
        className="w-[148px]"
        onClick={() => router.push('/video/upload')}
        aria-label="재밋후기 글 작성 페이지로 이동"
      >
        글 작성
      </Button>
    </div>
  );
}
