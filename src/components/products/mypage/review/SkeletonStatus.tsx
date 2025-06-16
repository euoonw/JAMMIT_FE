import { ImgTag01 } from '@/assets/received';
import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function SkeletonStatus() {
  return (
    <div className="w-[23rem] animate-pulse rounded-lg bg-[#28282a] px-[2.375rem] py-[2.375rem]">
      <div className="flex flex-col items-center">
        <ShimmerSkeleton className="mb-6 h-8 w-60 rounded bg-[#3a3a3a]" />
        <ImgTag01 />
      </div>
      <ul className="mt-[3.25rem] flex w-full flex-col gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ShimmerSkeleton
            key={i}
            className="h-10 w-full rounded-lg bg-[#3a3a3a]"
          />
        ))}
      </ul>
    </div>
  );
}
