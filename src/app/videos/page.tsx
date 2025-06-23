import VideoList from '@/components/products/videos/VideoList';
// import { prefetchVideoInfiniteQuery } from '@/hooks/queries/video/useVideoInfiniteQuery';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';

export default async function VideoListPage() {
  // const queryClient = new QueryClient();
  // await prefetchVideoInfiniteQuery({
  //   queryClient,
  //   sort: 'latest',
  //   size: 12,
  // });
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <VideoList />
    // </HydrationBoundary>
  );
}
