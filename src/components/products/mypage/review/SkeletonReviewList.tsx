import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function SkeletonReviewList() {
  return (
    <ul className="flex animate-pulse flex-col gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="pc:px-[3.75rem] pc:py-[3.75rem] tab:px-6 tab:py-6 rounded-lg bg-[#28282a] px-4 py-5"
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

          <div className="tab:px-3 flex w-full items-center justify-between rounded-lg border border-[#464141] px-5 py-4">
            <div className="flex-[1] overflow-hidden pr-4">
              <ShimmerSkeleton className="mb-2 h-4 w-full rounded bg-[#3a3a3a]" />
              <ShimmerSkeleton className="h-4 w-3/4 rounded bg-[#3a3a3a]" />
            </div>
            <ShimmerSkeleton className="h-[73px] w-[117px] rounded-lg bg-[#3a3a3a]" />
          </div>
        </li>
      ))}
    </ul>
  );
}
