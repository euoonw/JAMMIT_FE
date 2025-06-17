'use client';

import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function SkeletonUserCard() {
  return (
    <div className="flex h-[15.625rem] w-full items-center justify-center gap-[3.3125rem] bg-[#36114E] px-6">
      <div>
        <ShimmerSkeleton className="h-32 w-32 rounded-full" />
      </div>
      <div className="flex w-full max-w-[40rem] flex-col gap-4 text-gray-100">
        <div className="flex items-center gap-2">
          <ShimmerSkeleton className="h-6 w-32 rounded" />
          <ShimmerSkeleton className="h-4 w-4 rounded" />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <ShimmerSkeleton className="h-8 w-20 rounded-lg" />
          <ShimmerSkeleton className="h-8 w-16 rounded-lg" />
          <div className="h-5 w-px bg-gray-500" />
          <ShimmerSkeleton className="h-8 w-20 rounded-lg" />
          <ShimmerSkeleton className="h-8 w-16 rounded-lg" />
          <div className="h-5 w-px bg-gray-500" />
          <ShimmerSkeleton className="h-5 w-16 rounded" />
          <div className="h-5 w-px bg-gray-500" />
          <ShimmerSkeleton className="h-5 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
