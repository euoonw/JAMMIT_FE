import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';
import React from 'react';

export default function SkeletonReviewList() {
  return (
    <ul className="flex flex-auto animate-pulse flex-col gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="rounded-lg bg-[#28282a] px-[3.75rem] py-[3.75rem]"
        >
          <div className="mb-6 flex items-center gap-3">
            <ShimmerSkeleton className="h-14 w-14 rounded-full bg-[#3a3a3a]" />
            <ShimmerSkeleton className="h-4 w-24 rounded bg-[#3a3a3a]" />
            <ShimmerSkeleton className="h-4 w-12 rounded bg-[#3a3a3a]" />
          </div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {Array.from({ length: 4 }).map((_, j) => (
              <ShimmerSkeleton
                key={j}
                className="h-6 w-20 rounded-lg bg-[#3a3a3a]"
              />
            ))}
          </div>
          <ShimmerSkeleton className="mb-4 h-20 w-full rounded bg-[#3a3a3a]" />
          <ShimmerSkeleton className="mb-[35px] h-4 w-20 rounded bg-[#3a3a3a]" />
          <ShimmerSkeleton className="h-[84px] w-full rounded-lg bg-[#3a3a3a]" />
        </li>
      ))}
    </ul>
  );
}
