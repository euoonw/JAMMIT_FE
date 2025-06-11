'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import JamPage from '@/components/products/jam/JamPage';
import { useGatheringDetailQuery } from '@/hooks/queries/gatherings/useGatheringsDetailQuery';
import { RegisterGatheringsRequest } from '@/types/gather';
import { GatheringDetailResponse } from '@/types/gathering';

// GatheringDetailResponse를 RegisterGatheringsRequest로 변환하는 함수
const transformDetailToFormData = (
  detailData: GatheringDetailResponse,
): RegisterGatheringsRequest => {
  return {
    name: detailData.name,
    thumbnail: detailData.thumbnail,
    place: detailData.place,
    description: detailData.description,
    gatheringDateTime: detailData.gatheringDateTime,
    recruitDateTime: detailData.recruitDeadline,
    genres: detailData.genres,
    status: detailData.status,
    totalRecruitCount:
      detailData.sessions?.reduce(
        (total, session) => total + (session.recruitCount || 0),
        0,
      ) || 0,
    gatheringSessions:
      detailData.sessions?.map((session) => ({
        bandSession: session.bandSession,
        recruitCount: session.recruitCount,
      })) || [],
  };
};

export default function EditPage() {
  const { groupId } = useParams();
  const numericId = Number(groupId);
  const { data: gatherDetailData } = useGatheringDetailQuery(numericId);

  const initialData = gatherDetailData
    ? transformDetailToFormData(gatherDetailData)
    : undefined;

  return (
    <Suspense fallback={'Loading...'}>
      <JamPage
        formType="edit"
        groupId={Number(groupId)}
        initialData={initialData}
      />
    </Suspense>
  );
}
