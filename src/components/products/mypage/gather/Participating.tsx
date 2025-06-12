import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';
import { STATUS_ENUM_TO_KR } from '@/constants/cardMapping';
import { GatheringCard } from '@/types/card';

interface ParticipatingProps {
  gatherings: GatheringCard[];
  currentPage: number;
  totalPage: number;
  onLoadMore: () => void;
}

export default function Participating({
  gatherings,
  currentPage,
  totalPage,
  onLoadMore,
}: ParticipatingProps) {
  const hasMore = currentPage + 1 < totalPage;

  return (
    <InfinityScroll<GatheringCard>
      list={gatherings}
      item={(item) => (
        <CardItem item={item} status={STATUS_ENUM_TO_KR(item.status)} />
      )}
      emptyText="참여 중인 모집이 없습니다."
      onInView={onLoadMore}
      hasMore={hasMore}
    />
  );
}
