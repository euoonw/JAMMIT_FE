import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function VideoCardSkeleton() {
  return (
    <div>
      <ShimmerSkeleton className="pc:aspect-[16/9] tab:aspect-[87/25] aspect-[343/200] rounded-lg" />
      <ShimmerSkeleton className="mt-2 h-4 w-30" />
      <ShimmerSkeleton className="mt-2 h-4 w-20" />
      <ShimmerSkeleton className="mt-2 h-4 w-30" />
    </div>
  );
}
