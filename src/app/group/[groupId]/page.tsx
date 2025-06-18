import GroupPage from '@/components/products/group/GroupPage';
import { getGatheringDetail } from '@/lib/gatherings/gatherings';

interface Params {
  params: Promise<{
    groupId: string;
  }>;
}

export default async function Group({ params }: Params) {
  const { groupId } = await params;
  const numericId = Number(groupId);
  const data = await getGatheringDetail(numericId);

  return <GroupPage initialData={data} id={numericId} />;
}
