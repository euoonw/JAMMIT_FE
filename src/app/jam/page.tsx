import { Suspense } from 'react';

import JamPage from '@/components/products/jam/JamPage';

export default function Jam() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#212121]">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <JamPage />
    </Suspense>
  );
}
