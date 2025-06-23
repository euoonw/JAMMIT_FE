interface DropdownMenuListProps {
  /** 드롭다운에 표시할 메뉴 항목 목록 */
  menuOptions: string[];
  /** 사용자가 항목을 선택했을 때 실행되는 콜백 함수 */
  onSelect: (option: string) => void;
  /** Dropdownlist의 너비 */
  size?: 'sm' | 'md' | 'lg';
  /** 모바일 여부 */
  isMobile?: boolean;
}

export default function DropdownMenuList({
  menuOptions,
  onSelect,
  size,
  isMobile = false,
}: DropdownMenuListProps) {
  const sizeClass = {
    sm: 'w-[9rem]',
    md: 'pc:w-[26rem] tab:w-[32.5rem] w-[14rem]',
    lg: 'w-auto',
  }[size || 'lg'];

  return (
    <div
      className={`${!isMobile ? 'absolute' : ''} ${sizeClass} gap-[0.625rem] overflow-hidden rounded-lg border-1 border-[#505057] bg-[#34343A] text-gray-100`}
    >
      {menuOptions.map((option) => (
        <div
          key={option}
          onClick={() => onSelect(option)}
          className="cursor-pointer px-[1rem] py-[0.625rem] hover:bg-[#594D6C]"
        >
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
}
