'use client';

import { GENRE_ENUM_TO_KR } from '@/constants/tagsMapping';
import debounce from 'lodash.debounce';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tagWidthsRef = useRef<number[]>([]);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);
  useLayoutEffect(() => {
    if (!wrapperRef.current || !tags.length) {
      return;
    }
    const tagEls = Array.from(wrapperRef.current.children) as HTMLElement[];
    const GAP = 8;
    tagWidthsRef.current = tagEls.map((el) => el.offsetWidth + GAP);
  }, [tags]);

  // 옵저버 등록
  useEffect(() => {
    const visivelTag = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const containerWidth = wrapper.offsetWidth;
      const RESERVED = 40;

      let total = 0;
      const visible: string[] = [];
      const hidden: string[] = [];

      for (let i = 0; i < tags.length; i++) {
        total += tagWidthsRef.current[i] ?? 0;
        if (total < containerWidth - RESERVED) {
          visible.push(tags[i]);
        } else {
          hidden.push(tags[i]);
        }
      }
      setVisibleTags(visible);
      setHiddenTags(hidden);
    };
    if (!wrapperRef.current || !tags.length) {
      return;
    }
    const handleResize = debounce(() => {
      requestAnimationFrame(visivelTag);
    }, 100);
    const observer = new ResizeObserver(handleResize);
    observer.observe(wrapperRef.current);

    visivelTag();

    return () => {
      observer.disconnect();
      handleResize.cancel();
    };
  }, [tags]);
  return (
    <div
      className="mt-[1.25rem] flex flex-wrap gap-[0.375rem]"
      ref={wrapperRef}
    >
      {(visibleTags.length ? visibleTags : tags).map((tag) => (
        <span
          key={tag}
          className="rounded-lg bg-[var(--bg-34343A)] px-3 py-1.5 text-sm font-medium"
        >
          {GENRE_ENUM_TO_KR[tag]}
        </span>
      ))}
      {visibleTags.length > 0 && hiddenTags.length > 0 && (
        <span className="rounded-lg bg-[var(--bg-34343A)] px-3 py-1.5 text-sm font-medium">
          ...
        </span>
      )}
    </div>
  );
}
