'use client';

import { forwardRef, Fragment, ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';

type InfinityScrollVariant = 'list' | 'grid';

// 0.5: 화면에 요소의 절반이 보이면 감지
// 0: 화면에 요소의 조금이라도 보이면 감지
// 1: 화면에 요소의 완전히 보이면 감지
const INFINITY_SCROLL_THRESHOLD = 0.5;

const createGridList = (className: string) => {
  const GridList = forwardRef<HTMLDivElement>((props, ref) => (
    <div {...props} ref={ref} className={className} />
  ));
  GridList.displayName = 'GridList';
  return GridList;
};

interface InfinityScrollProps<T> {
  /** 렌더링할 데이터 리스트 */
  list?: T[];
  /** 각 아이템을 렌더링하는 함수 */
  item: (itemData: T) => ReactNode;
  /** 데이터가 없을 때 사용할 문구 */
  emptyText: string;
  /** 무한스크롤 감지 */
  onInView: () => void;
  /** 더 불러올 데이터가 있는지 확인 */
  hasMore?: boolean;
  // 정렬 css
  className?: string;
  // 스크롤 타입
  variant?: InfinityScrollVariant;
}

export default function InfinityScroll<T>({
  list,
  item,
  emptyText,
  onInView,
  hasMore = true,
  className,
  variant = 'grid',
}: InfinityScrollProps<T>) {
  const [isFetching, setIsFetching] = useState(false);
  const { ref: observerRef, inView } = useInView({
    threshold: INFINITY_SCROLL_THRESHOLD,
  });
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setIsFetching(true);
      onInView();
    }
  }, [inView, onInView, isFetching, hasMore]);

  // 리스트 변화감지
  useEffect(() => {
    if (list) {
      setIsFetching(false);
    }
  }, [list]);

  if (!list || list.length === 0) {
    return (
      <div className="flex-auto rounded-lg bg-[#28282a] px-[3.75rem] py-[3.75rem] text-center">
        {emptyText}
      </div>
    );
  }
  const DynamicGridList = createGridList(
    className ?? 'pc:grid-cols-4 grid grid-cols-1 gap-x-5 gap-y-10',
  );
  if (variant === 'list') {
    return (
      <Fragment>
        <Virtuoso
          useWindowScroll
          totalCount={list.length}
          itemContent={(index) => item(list[index])}
          className={className}
        />
        {hasMore && <div ref={observerRef} className="h-10 w-full" />}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <VirtuosoGrid
        totalCount={list.length}
        useWindowScroll
        components={{
          List: DynamicGridList,
          Item: ({ children, ...props }) => <div {...props}>{children}</div>,
        }}
        itemContent={(index) => item(list[index])}
      />
      {hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </Fragment>
  );
}
