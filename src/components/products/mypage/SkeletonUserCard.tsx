import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function SkeletonUserCard() {
  return (
    <div className="pc:h-[15.625rem] pc:gap-[3.3125rem] tab:gap-5 flex h-[7.375rem] w-full items-center justify-center gap-6 bg-[#36114E] px-6">
      <div>
        <ShimmerSkeleton className="pc:h-32 pc:w-32 tab:h-24 tab:w-24 h-16 w-16 rounded-full" />
      </div>
      <div className="flex w-full max-w-[40rem] flex-col gap-4 text-gray-100">
        <div className="flex items-center gap-[0.625rem]">
          <ShimmerSkeleton className="h-6 w-32 rounded" />
          <ShimmerSkeleton className="h-4 w-4 rounded" />
        </div>
        <div className="pc:flex hidden flex-wrap items-center gap-[0.5rem] text-sm font-medium">
          <p className="text-sm opacity-50">담당 세션</p>
          <ShimmerSkeleton className="h-8 w-20 rounded-lg" />
          <ShimmerSkeleton className="h-8 w-16 rounded-lg" />
          <div className="h-5 w-px bg-gray-500" />
          <p className="text-sm opacity-50">선호 장르</p>
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
