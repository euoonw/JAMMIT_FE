import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function VideoDetailSkeleton() {
  return (
    <div className="pc:max-w-[84rem] pc:mt-6 pc:mb-36 tab:mb-11 mx-auto mb-6 animate-pulse">
      <ShimmerSkeleton className="pc:h-[38rem] tab:h-[28rem] h-[20rem] w-full rounded-lg" />

      <div className="pc:mt-6 tab:mt-8 pc:mx-0 tab:mx-8 mx-4 mt-4">
        <div className="pc:flex tab:flex block items-start justify-between">
          <div className="w-full">
            <ShimmerSkeleton className="mb-3 h-6 w-3/5 rounded" />
            <ShimmerSkeleton className="mb-2 h-5 w-1/4 rounded" />
            <ShimmerSkeleton className="h-4 w-1/3 rounded" />
          </div>
          <div className="pc:mt-0 tab:mt-0 mt-6 flex items-center gap-6">
            <ShimmerSkeleton className="h-6 w-6 rounded-full" />
            <ShimmerSkeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>

        <ShimmerSkeleton className="mt-8 h-24 w-full rounded" />

        <div className="mt-10 flex items-center">
          <ShimmerSkeleton className="h-6 w-20 rounded" />
          <ShimmerSkeleton className="mx-2 h-6 w-10 rounded" />
          <div className="h-[1px] flex-1 bg-[#9ca3af]" />
        </div>

        <div className="mt-4 border-b border-b-[#9ca3af] pb-6">
          <div className="mb-4 flex items-center gap-4">
            <ShimmerSkeleton className="h-11 w-full rounded" />
            <ShimmerSkeleton className="h-11 w-20 rounded" />
          </div>

          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="pc:py-8 flex items-start gap-4 border-t border-t-[#2d3035] py-5"
            >
              <ShimmerSkeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <ShimmerSkeleton className="mb-2 h-5 w-1/5 rounded" />
                <ShimmerSkeleton className="h-4 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
