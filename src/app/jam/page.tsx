import { Suspense } from 'react';

import JamPage from '@/components/products/jam/JamPage';

export default function Jam() {
  return (
    <Suspense fallback={'Loading...'}>
      <JamPage />
    </Suspense>
  );
}
