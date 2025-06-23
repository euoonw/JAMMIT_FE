import { Suspense } from 'react';
import MyPageContent from '@/components/products/mypage/MyPageContent';

export default async function MyPage() {
  return (
    <Suspense>
      <MyPageContent />
    </Suspense>
  );
}
