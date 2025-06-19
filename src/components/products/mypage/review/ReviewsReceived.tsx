'use client';
import { REVIEW_METRICS } from '@/constants/review';
import { useDeviceType } from '@/hooks/useDeviceType';
import { ReviewStatusPros } from '@/types/review';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewStatusProps {
  data: ReviewStatusPros;
}

const MAX_VISIBLE_ITEMS = 3;

export default function ReviewStatusItem({ data }: ReviewStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const device = useDeviceType();
  // 차트 변환
  const max = Math.max(
    ...REVIEW_METRICS.map((item) => data[item.countKey] ?? 0),
  );

  const chartData = REVIEW_METRICS.map((item) => {
    const count = data[item.countKey] ?? 0;
    return {
      label: item.label,
      name: item.name,
      value: (count / max) * 100,
      count,
    };
  }).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.label.localeCompare(b.label);
  });
  const labelToImage: Record<string, string> = {
    '연주 실력이 좋아요': '/images/received/img_tag_sticker_02.avif',
    '곡 준비를 잘 해왔어요': '/images/received/img_tag_sticker_03.avif',
    '다른 파트와의 호흡이 잘 맞아요':
      '/images/received/img_tag_sticker_04.avif',
    '악보나 연습자료를 잘 공유해줬어요':
      '/images/received/img_tag_sticker_05.avif',
    '분위기를 잘 이끌어요': '/images/received/img_tag_sticker_06.avif',
    '팀워크가 좋고 함께 연주하기 편했어요':
      '/images/received/img_tag_sticker_07.avif',
    '볼륨이나 톤을 배려해줘요': '/images/received/img_tag_sticker_08avif',
    '합주 시간 약속을 잘 지켜요': '/images/received/img_tag_sticker_09.avif',
  };

  // PC에서는 모든 데이터, 모바일/태블릿에서는 접기/펼치기
  const visibleItems =
    device === 'pc'
      ? chartData
      : isExpanded
        ? chartData
        : chartData.slice(0, MAX_VISIBLE_ITEMS);

  // 평가가 없을시
  const hasNoScore = max === 0;

  // max가 여러개일시
  const topItems = chartData.filter((item) => item.count === max);
  const topItem = topItems[0];
  const SelectedImage = hasNoScore
    ? '/images/received/img_tag_sticker_01.avif'
    : (labelToImage[topItems[0].name] ??
      '/images/received/img_tag_sticker_01.avif');
  const title = hasNoScore ? '아직 받은 평가가 없어요' : topItem.label;
  return (
    <div className="pc:w-[23rem] w-full rounded-lg bg-[#28282a] px-[2.375rem] py-[2.375rem]">
      <div className="flex flex-col items-center">
        <p className="loading-[160%] mb-6 text-2xl font-bold">
          &quot;{title}&quot;
        </p>
        <Image src={SelectedImage} alt="" width={196} height={224} />
      </div>
      <ul className="tab:w-[18.25rem] mx-auto mt-[3.25rem] flex w-full flex-col gap-4">
        {visibleItems.map((item) => (
          <li
            key={`${item.name}-${item.value}`}
            className="relative flex h-10 items-center overflow-hidden rounded-lg bg-[#52525E] px-4"
          >
            <div className="relative z-10 flex w-full justify-between">
              <p>{item.name}</p>
              <p>{item.count}</p>
            </div>
            <motion.div
              className={clsx(
                'absolute top-0 left-0 z-1 h-full rounded-lg transition-all',
                item.count === max ? 'bg-[var(--purple-750)]' : 'bg-[#6F52A3]',
              )}
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </li>
        ))}
      </ul>
      {device !== 'pc' && chartData.length > MAX_VISIBLE_ITEMS && (
        <button
          className="pc:hidden mx-auto mt-4 block text-sm font-semibold text-[var(--purple-600)]"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? '숨기기' : '더보기'}
        </button>
      )}
    </div>
  );
}
