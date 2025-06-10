'use client';
import React from 'react';
import { StaticImageData } from 'next/image';
// import { useSuspenseQuery } from '@tanstack/react-query';
// import { getStatus } from '@/lib/review/received';
import {
  ImgTag01,
  ImgTag02,
  ImgTag03,
  ImgTag04,
  ImgTag05,
  ImgTag06,
  ImgTag07,
  ImgTag08,
  ImgTag09,
} from '@/assets/images/received';
import { dummyReviewData, REVIEW_METRICS } from '@/constants/review';
import clsx from 'clsx';

export default function ReviewStatus() {
  // const { data } = useSuspenseQuery({
  //   queryKey: ['getStatus'],
  //   queryFn: getStatus,
  // });

  // 차트 변환
  const max = Math.max(
    ...REVIEW_METRICS.map((item) => dummyReviewData[item.countKey] ?? 0),
  );

  const chartData = REVIEW_METRICS.map((item) => {
    const count = dummyReviewData[item.countKey] ?? 0;
    return {
      label: item.label,
      name: item.name,
      value: (count / max) * 100,
      count,
    };
  });
  const labelToImage: Record<string, StaticImageData> = {
    '연주 실력이 좋아요': ImgTag02,
    '곡 준비를 잘 해왔어요': ImgTag03,
    '다른 파트와의 호흡이 잘 맞아요': ImgTag04,
    '악보나 연습자료를 잘 공유해줬어요': ImgTag05,
    '분위기를 잘 이끌어요': ImgTag06,
    '팀워크가 좋고 함께 연주하기 편했어요': ImgTag07,
    '볼륨이나 톤을 배려해줘요': ImgTag08,
    '합주 시간 약속을 잘 지켜요': ImgTag09,
  };

  // 평가가 없을시
  const hasNoScore = max === 0;
  // max가 여러개일시
  const topItems = chartData.filter((item) => item.count === max);
  const topItem = topItems[0];
  const SelectedImage = hasNoScore
    ? ImgTag01
    : (labelToImage[topItems[0].name] ?? ImgTag01);
  const title = hasNoScore ? '아직 받은 평가가 없어요' : topItem.label;
  return (
    <div className="w-[23rem] rounded-lg bg-[#28282a] px-[2.375rem] py-[2.375rem]">
      <div className="flex flex-col items-center">
        <p className="loading-[160%] mb-6 text-2xl font-bold">
          &quot;{title}&quot;
        </p>
        <SelectedImage />
      </div>
      <ul className="mt-[3.25rem] flex w-full flex-col gap-4">
        {chartData.map((item) => (
          <li
            key={`${item.name}-${item.value}`}
            className="relative flex h-10 items-center overflow-hidden rounded-lg bg-[#52525E] px-4"
          >
            <div className="relative z-10 flex w-full justify-between">
              <p>{item.name}</p>
              <p>{item.count}</p>
            </div>
            <div
              className={clsx(
                'absolute top-0 left-0 z-1 h-full rounded-lg transition-all',
                item.count === max ? 'bg-[var(--purple-700)]' : 'bg-[#6F52A3]',
              )}
              style={{ width: `${item.value}%` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
