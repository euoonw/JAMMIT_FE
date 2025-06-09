import React from 'react';
import Link from 'next/link';
import { Card } from '.';
import Like from '../Like';
import { GatheringCard } from '@/types/card';
import { CardStatus } from '@/constants/card';

interface CardItemProps {
  item: GatheringCard;
  isLike?: boolean;
  status: CardStatus;
}

export default function CardItem({
  item,
  isLike = false,
  status,
}: CardItemProps) {
  return (
    <Link key={item.id} href={`/group/${item.id}`}>
      <div className="relative h-[12.5rem] overflow-hidden rounded-lg">
        {isLike && <Like item={item} />}
        <Card.Thumbnail thumbnail={item.thumbnail} alt={item.name} />
      </div>

      <Card.TagList tags={item.genres} />
      <Card.TitleBlock title={item.name} author={item.creator.nickname} />
      <Card.Footer
        status={status}
        totalCurrent={item.totalCurrent}
        totalRecruit={item.totalRecruit}
        recruitDeadline={item.recruitDeadline}
        member={item.sessions}
        id={item.id}
      />
    </Link>
  );
}
