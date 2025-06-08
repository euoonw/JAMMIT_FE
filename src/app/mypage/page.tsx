import { Suspense } from 'react';
import MyPageContent from '@/components/products/mypage/MyPageContent';

export default function MyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#212121]">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <MyPageContent />
    </Suspense>
  );
}
