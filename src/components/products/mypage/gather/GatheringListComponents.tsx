import CardItem from '@/components/commons/Card/CardItem';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { STATUS_ENUM_TO_KR } from '@/constants/cardMapping';
import { GatheringCard } from '@/types/card';

interface GatheringListComponentsProps {
  gatherings: GatheringCard[];
  currentPage: number;
  totalPage: number;
  onLoadMore: () => void;
  emptyText: string;
}

export default function GatheringListComponents({
  gatherings,
  currentPage,
  totalPage,
  onLoadMore,
  emptyText,
}: GatheringListComponentsProps) {
  const hasMore = currentPage + 1 < totalPage;

  return (
    <InfinityScroll<GatheringCard>
      list={gatherings}
      item={(item, index) => (
        <CardItem
          item={item}
          status={STATUS_ENUM_TO_KR(item.status)}
          isFirst={index === 0}
        />
      )}
      emptyText={emptyText}
      onInView={onLoadMore}
      hasMore={hasMore}
    />
  );
}
