import Link from 'next/link';
import JammitLogo from '@/assets/icons/ic_jammit_logo.svg';
import { useDeviceType } from '@/hooks/useDeviceType';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  linkTo?: 'login' | 'signup';
}

export default function AuthCard({ title, children, linkTo }: AuthCardProps) {
  const device = useDeviceType();
  let linkQuestion = '';
  let linkText = '';
  let linkHref = '';
  switch (linkTo) {
    case 'login':
      linkQuestion = '이미 회원이신가요?';
      linkText = '로그인';
      linkHref = '/login';
      break;
    case 'signup':
      linkQuestion = 'JAMMIT이 처음이신가요?';
      linkText = '회원가입';
      linkHref = '/signup/step1';
      break;
  }
  return (
    <div>
      <div className="flex min-h-[calc(100vh-7.5rem)] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[2.5rem]">
          {device !== 'mob' && <JammitLogo width={271} height={48} />}
          <div className="tab:px-[3.375rem] tab:py-[3.375rem] flex w-full max-w-[31.875rem] flex-col items-center justify-center rounded-[1.5rem] bg-[#242429] px-[1rem] py-[2rem]">
            <h1 className="mb-[2rem] text-[1.5rem] font-semibold text-gray-100">
              {title}
            </h1>
            {children}
            {linkTo && (
              <div className="mt-[2.5rem] flex justify-center">
                <p className="mr-1 text-[0.938rem] font-medium text-gray-400">
                  {linkQuestion}
                </p>
                <Link
                  href={linkHref}
                  className="text-[0.938rem] font-medium text-[#BF52FF] underline underline-offset-2"
                >
                  {linkText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
