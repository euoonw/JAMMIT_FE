import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';
import { Fragment } from 'react';

export default function WishHeaderSkeleton() {
  return (
    <Fragment>
      <ShimmerSkeleton className="pc:aspect-[1344/250] tab:aspect-[186/49] aspect-[375/199] overflow-hidden rounded-lg" />
      <div className="pc:px-0 tab:px-6 mt-8 mb-9 flex items-center justify-between px-4">
        <div className="pc:w-auto pc:justify-normal flex w-full justify-between gap-2">
          <div className="flex gap-2">
            <ShimmerSkeleton className="pc:h-10 pc:w-36 relative h-[2.25rem] w-[7.5rem] rounded-xl" />
            <ShimmerSkeleton className="pc:h-10 pc:w-36 relative h-[2.25rem] w-[7.5rem] rounded-xl" />
          </div>
          <ShimmerSkeleton className="pc:h-10 pc:w-[6.875rem] h-9 w-9 rounded-xl" />
        </div>
        <div className="pc:static fixed bottom-[1.375rem] z-10">
          <ShimmerSkeleton className="pc:w-[9.25rem] tab:w-[calc(100%-48px)] h-11 w-[calc(100%-32px)] rounded-lg" />
        </div>
      </div>
    </Fragment>
  );
}
