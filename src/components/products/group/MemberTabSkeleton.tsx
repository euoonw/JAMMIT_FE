import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function MemberTabSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[84rem] pt-[1.5rem]">
      <ShimmerSkeleton className="pc:rounded-[0.5rem] relative h-[22rem] w-full" />
      <ShimmerSkeleton className="pc:w-[60.25rem] relative mt-[4rem] h-[20.75rem] w-full rounded-[0.5rem]" />
    </div>
  );
}
