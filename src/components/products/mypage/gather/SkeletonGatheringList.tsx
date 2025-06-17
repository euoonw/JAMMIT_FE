'use client';

import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function SkeletonGatheringList() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx}>
          {/* 썸네일 영역 */}
          <div className="pc:aspect-[8/5] tab:aspect-[87/25] relative aspect-[343/200] overflow-hidden rounded-lg">
            <ShimmerSkeleton className="absolute inset-0 h-full w-full" />
          </div>

          {/* 태그 리스트 */}
          <div className="mt-[1.25rem] mb-1 flex gap-2">
            <ShimmerSkeleton className="h-6 w-16 rounded" />
            <ShimmerSkeleton className="h-6 w-12 rounded" />
            <ShimmerSkeleton className="h-6 w-14 rounded" />
          </div>

          {/* 제목 + 작성자 */}
          <div className="mt-5">
            <ShimmerSkeleton className="h-5 w-3/4 rounded" />
            <ShimmerSkeleton className="mt-5 h-4 w-1/3 rounded" />
          </div>

          <hr className="mt-5 w-full border-[#393940]" />
        </div>
      ))}
    </div>
  );
}
