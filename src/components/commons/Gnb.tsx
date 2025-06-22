'use client';

import JammitLogo from '@/assets/icons/ic_jammit_logo.svg';
import Dropdown from '@/components/commons/Dropdown';
import { useUserStore } from '@/stores/useUserStore';
import { logout } from '@/utils/authService';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ProfileImage from './ProfileImage';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';

const PROFILE_OPTIONS = ['마이페이지', '로그아웃'];

export default function Gnb() {
  const router = useRouter();
  const pathname = usePathname();

  const device: DeviceType = useDeviceType();

  const logoSize: Record<DeviceType, { width: number; height: number }> = {
    mob: { width: 83, height: 14 },
    tab: { width: 113, height: 20 },
    pc: { width: 113, height: 20 },
  };

  const { width, height } = logoSize[device];

  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const navItems = [
    { href: '/', label: '모임 찾기' },
    { href: '/wishlist', label: '찜한 모임' },
    { href: '/videos', label: '재밋후기' },
  ];

  const handleProfileSelect = (option: string) => {
    if (option === '마이페이지') {
      router.push('/mypage');
    } else if (option === '로그아웃') {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    router.push('/');
    await logout();
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="tab:px-[1.5rem] flex h-[3.75rem] w-full items-center justify-center bg-[#151515] px-[1rem]">
        <div className="flex w-full max-w-[84rem] items-center justify-between text-white">
          <nav className="pc:gap-[1.5rem] flex gap-[0.75rem]">
            <Link
              href="/"
              data-active={pathname === '/'}
              aria-label="JAMMIT 홈으로 이동"
              className="flex items-center"
            >
              <JammitLogo width={width} height={height} />
            </Link>
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                data-active={pathname === href}
                className="pc:text-[1rem] text-[0.875rem] font-semibold text-gray-300 data-[active=true]:font-bold data-[active=true]:text-gray-100"
                aria-label={`${label} 페이지로 이동`}
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
                className="pc:text-[1rem] text-[0.875rem] font-semibold opacity-80 data-[active=true]:font-bold data-[active=true]:opacity-100"
                href="/login"
                aria-label="로그인 페이지로 이동"
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
