import { Suspense } from 'react';
import MyPageContent from '@/components/products/mypage/MyPageContent';

export default function MyPage() {
  return (
    <Suspense fallback={'Loading...'}>
      <MyPageContent />
    </Suspense>
  );
}
