'use client';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { useQueryTab } from '@/hooks/useQueryTab';

interface GroupPageLayoutProps {
  banner: ReactNode;
  actionButtons?: ReactNode;
  children: ReactNode;
  isTab?: boolean;
  participantsNumber?: number;
}

export default function GroupPageLayout({
  banner,
  actionButtons,
  children,
  isTab = true,
  participantsNumber,
}: GroupPageLayoutProps) {
  const { activeTab, setTab } = useQueryTab<'recruit' | 'members'>(
    'tab',
    'recruit',
    ['recruit', 'members'],
  );

  const tabClass = (isActive: boolean) =>
    clsx(
      'text-[1rem]',
      isActive
        ? 'text-gray-100 underline decoration-purple-700 decoration-[3px] underline-offset-[6px]'
        : 'text-gray-400 cursor-pointer',
    );

  return (
    <div className="mx-auto w-[84rem] pt-[1.5rem]">
      {/* 상단 베너 */}
      {banner}

      {/* 탭 */}
      {isTab && (
        <div className="flex w-full justify-center gap-[1.25rem] py-[1.25rem]">
          <button
            onClick={() => setTab('recruit')}
            className={tabClass(activeTab === 'recruit')}
          >
            모집글
          </button>

          <div className="flex items-center gap-[0.2rem]">
            <button
              onClick={() => setTab('members')}
              className={tabClass(activeTab === 'members')}
            >
              참여멤버
            </button>
            <span
              className={clsx(
                'flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full text-[0.75rem]',
                activeTab === 'members'
                  ? 'bg-purple-700 text-gray-100'
                  : 'bg-[#6E00B8] text-gray-300',
              )}
            >
              {participantsNumber}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between pb-[3.875rem]">
        {/* 메인 본문 */}
        {children}

        {/* 우측 버튼 */}
        <div className="flex justify-between">{actionButtons}</div>
      </div>
    </div>
  );
}
