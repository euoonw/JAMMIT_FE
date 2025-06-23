import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';
import Image from 'next/image';

export default function SkeletonStatus() {
  return (
    <div className="pc:w-[23rem] w-full animate-pulse rounded-lg bg-[#28282a] px-[2.375rem] py-[2.375rem]">
      <div className="flex flex-col items-center">
        <ShimmerSkeleton className="mb-6 h-8 w-60 rounded bg-[#3a3a3a]" />
        <Image
          src="/images/received/img_tag_sticker_01.avif"
          alt="랜더링중"
          width={196}
          height={224}
        />
      </div>
      <ul className="tab:w-[18.25rem] mx-auto mt-[3.25rem] flex w-full flex-col gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ShimmerSkeleton
            key={i}
            className="h-10 w-full rounded-lg bg-[#3a3a3a]"
          />
        ))}
      </ul>
      <div className="pc:hidden mt-4 flex justify-center">
        <ShimmerSkeleton className="h-5 w-16 rounded bg-[#3a3a3a]" />
      </div>
    </div>
  );
}
