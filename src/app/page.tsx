import RecruitPage from '@/components/products/recruit/RecruitPage';
import { BandSession, Genre } from '@/types/tags';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();
  const defaultGenres: Genre[] = [];
  const defaultSessions: BandSession[] = [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecruitPage
        defaultGenres={defaultGenres}
        defaultSessions={defaultSessions}
      />
    </HydrationBoundary>
  );
}
