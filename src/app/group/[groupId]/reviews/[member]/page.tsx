import ReviewPageClient from '@/components/products/group/ReviewPageClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  params: Promise<{ groupId: string; member: string }>;
}

export default async function page({ params }: Props) {
  const queryClient = new QueryClient();
  const { groupId, member } = await params;
  const gatheringId = Number(groupId);
  const userId = Number(member);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewPageClient gatheringId={gatheringId} userId={userId} />
    </HydrationBoundary>
  );
}
