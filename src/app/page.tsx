import RecruitPage from '@/components/products/recruit/RecruitPage';
import { prefetchCommonInfiniteQuery } from '@/hooks/queries/recruit/useRecruit';
import { getRecruit } from '@/lib/recruit/recruit';
import { BandSession, Genre } from '@/types/tags';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface HomeProps {
  searchParams: Promise<{
    showShareModal?: string;
    groupId?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const queryClient = new QueryClient();
  const defaultGenres: Genre[] = [];
  const defaultSessions: BandSession[] = [];
  const defaultSort = '';

  await prefetchCommonInfiniteQuery({
    queryClient,
    key: 'list',
    variables: { genres: defaultGenres, sessions: defaultSessions },
    size: 8,
    sort: defaultSort,
    includeCanceled: false,
    fetchFn: getRecruit,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecruitPage
        defaultGenres={defaultGenres}
        defaultSessions={defaultSessions}
        showShareModal={resolvedSearchParams.showShareModal === 'true'}
        shareGroupId={resolvedSearchParams.groupId}
      />
    </HydrationBoundary>
  );
}
