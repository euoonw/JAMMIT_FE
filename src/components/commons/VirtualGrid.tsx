'use client';
import { GatheringCard } from '@/types/card';
import { ReviewItem } from '@/types/review';
import Image from 'next/image';
import React, { forwardRef, Fragment } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { InfinityScrollVariant } from './InfinityScroll';

const createGridList = (className: string) => {
  const GridList = forwardRef<HTMLDivElement>((props, ref) => (
    <div {...props} ref={ref} className={className} />
  ));
  GridList.displayName = 'GridList';
  return GridList;
};
interface VirtualGridProps<T> {
  list: T[];
  item: (data: T, index: number) => React.ReactNode;
  emptyText?: string;
  variant?: InfinityScrollVariant;
  className?: string;
}

export default function VirtualGrid<T>({
  list,
  item,
  emptyText = '아직 찜한 모임이 없어요',
  variant = 'grid',
  className,
}: VirtualGridProps<T>) {
  if ((!list || list.length === 0) && variant === 'list') {
    return (
      <div className="flex-auto rounded-lg bg-[#28282a] px-[3.75rem] py-[3.75rem] text-center">
        <Image
          src="/images/img_character01.png"
          alt="링크 공유 캐릭터 이미지"
          width={128}
          height={128}
          className="mx-auto my-0 mb-[1.375rem]"
        />
        {emptyText}
      </div>
    );
  }
  if (!list || list.length === 0) {
    return (
      <div className="border-b border-[var(--gray-600)] pt-[11.25rem] pb-[15.8125rem] text-center text-[var(--gray-500)]">
        <Image
          src="/images/img_character01.png"
          alt="링크 공유 캐릭터 이미지"
          width={128}
          height={128}
          className="mx-auto my-0 mb-[1.375rem]"
        />
        {emptyText}
      </div>
    );
  }
  const DynamicGridList = createGridList(
    className ??
      'pc:grid-cols-4 grid grid-cols-1 pc:gap-x-5 gap-y-10 pc:px-0 tab:px-6 px-4',
  );
  if (variant === 'list') {
    return (
      <Fragment>
        <Virtuoso
          totalCount={list.length}
          useWindowScroll
          computeItemKey={(index) => (list[index] as ReviewItem)?.id ?? index}
          itemContent={(index) => item(list[index], index)}
          className={className}
        />
      </Fragment>
    );
  }
  return (
    <VirtuosoGrid
      totalCount={list.length}
      useWindowScroll
      computeItemKey={(index) => (list[index] as GatheringCard)?.id ?? index}
      components={{
        List: DynamicGridList,
        Item: ({ children, ...props }) => <div {...props}>{children}</div>,
      }}
      itemContent={(index) => item(list[index], index)}
    />
  );
}
