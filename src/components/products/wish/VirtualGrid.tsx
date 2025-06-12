'use client';
import React, { forwardRef } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

const GridList = forwardRef<HTMLDivElement>((props, ref) => (
  <div
    {...props}
    ref={ref}
    className="pc:grid-cols-4 pc:px-0 tab:px-6 grid grid-cols-1 gap-x-5 gap-y-10 px-4"
  />
));
GridList.displayName = 'GridList';

interface VirtualGridProps<T> {
  list: T[];
  item: (data: T) => React.ReactNode;
  emptyText?: string;
}

export default function VirtualGrid<T>({
  list,
  item,
  emptyText = '아직 찜한 모임이 없어요',
}: VirtualGridProps<T>) {
  if (!list || list.length === 0) {
    return (
      <div className="border-b border-[var(--gray-600)] pt-[11.25rem] pb-[15.8125rem] text-center text-[var(--gray-500)]">
        {emptyText}
      </div>
    );
  }
  return (
    <VirtuosoGrid
      totalCount={list.length}
      useWindowScroll
      components={{
        List: GridList,
        Item: ({ children, ...props }) => <div {...props}>{children}</div>,
      }}
      itemContent={(index) => item(list[index])}
    />
  );
}
