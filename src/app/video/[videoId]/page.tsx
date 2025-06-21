import VideoDetailClient from '@/components/products/video/VideoDetailClient';
import { prefetchVideoQuery } from '@/hooks/queries/video/useVideoDetail';
import { getVideoDetail } from '@/lib/video/videoDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface Params {
  videoId: string;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { videoId } = await params;
  const data = await getVideoDetail({ videoId });

  return {
    title: `JAMMIT · ${data.title}`,
    description: data.description,
    openGraph: {
      title: `JAMMIT · ${data.title}`,
      description: data.description,
      url: `https://jammit-fe-six.vercel.app/video/${data.id}`,
      siteName: 'JAMMIT',
      type: 'video.other',
      images: [data.thumbnailUrl],
    },
  };
}

export default async function page({ params }: { params: Params }) {
  const queryClient = new QueryClient();
  const { videoId } = await params;
  await prefetchVideoQuery({ queryClient, videoId });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoDetailClient videoId={videoId} />
    </HydrationBoundary>
  );
}
