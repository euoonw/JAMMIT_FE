'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import JammitLogo from '@/assets/icons/ic_jammit_logo.svg';
import Dropdown from '@/components/commons/Dropdown';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/authService';
import { useUserStore } from '@/stores/useUserStore';
import ProfileImage from './ProfileImage';

const PROFILE_OPTIONS = ['마이페이지', '로그아웃'];

export default function Gnb() {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const navItems = [
    { href: '/', label: '모임 찾기' },
    { href: '/wishlist', label: '찜한 모임' },
  ];

  const handleProfileSelect = (option: string) => {
    if (option === '마이페이지') {
      router.push('/mypage');
    } else if (option === '로그아웃') {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="flex h-[3.75rem] w-full items-center justify-center bg-[#151515] px-[1.75rem]">
        <div className="flex w-full max-w-[84rem] items-center justify-between text-white">
          <nav className="flex gap-[1.5rem]">
            <Link href="/" data-active={pathname === '/'}>
              <JammitLogo />
            </Link>
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                data-active={pathname === href}
                className="font-semibold text-gray-300 data-[active=true]:font-bold data-[active=true]:text-gray-100"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div>
            {isLoggedIn ? (
              <Dropdown
                menuOptions={PROFILE_OPTIONS}
                onSelect={handleProfileSelect}
                singleIcon={<ProfileImage src={user?.profileImagePath} />}
                isProfile
              />
            ) : (
              <Link
                data-active={pathname === '/login'}
                className="font-semibold opacity-80 data-[active=true]:font-bold data-[active=true]:opacity-100"
                href="/login"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
