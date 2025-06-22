import { VideoItem } from '@/types/video';
import { formatDateToYYMMDD } from '@/utils/formatDate';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();
  const formatDuration = (duration: string | null) => {
    if (!duration) return '00:00';
    const [h, m, s] = duration.split(':');
    return h === '00' ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  const handleClick = () => {
    router.push(`/video/${video.id}`);
  };

  return (
    <div
      className="pc:w-[20rem] w-full cursor-pointer rounded-lg"
      onClick={handleClick}
    >
      <div className="pc:aspect-[16/9] tab:aspect-[87/25] relative aspect-[343/200] w-full">
        <div className="pc:aspect-[16/9] tab:aspect-[87/25] aspect-[343/200] w-full overflow-hidden rounded-[0.5rem]">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={320}
            height={180}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute right-[0.625rem] bottom-[0.625rem] flex h-[1.5rem] items-center justify-center rounded-[0.25rem] bg-white/40 px-[0.375rem] text-[0.875rem] text-black">
          <span className="text-center">{formatDuration(video.duration)}</span>
        </div>
      </div>

      <div className="mt-[0.625rem] flex h-[4.375rem] flex-col justify-between">
        <h3 className="text-[1rem] font-bold text-gray-100">{video.title}</h3>
        <p className="text-[1rem] text-gray-100 opacity-60">{video.nickname}</p>
        <p className="text-[1rem] text-gray-100 opacity-60">
          조회수 {video.viewCount}회 | {formatDateToYYMMDD(video.createdAt)}
        </p>
      </div>
    </div>
  );
}
