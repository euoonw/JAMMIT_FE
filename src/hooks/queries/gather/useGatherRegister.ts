import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postRegisterGatherings } from '@/lib/gathering/register';
import { handleAuthApiError } from '@/utils/authApiError';
import {
  RegisterGatheringsRequest,
  RegisterGatheringsResponse,
} from '@/types/gather';

export const useGatherRegister = () => {
  const router = useRouter();

  return useMutation<
    RegisterGatheringsResponse,
    Error,
    RegisterGatheringsRequest
  >({
    mutationFn: postRegisterGatherings,
    onSuccess: (data) => {
      alert(`모임이 성공적으로 생성되었습니다. ID: ${data.id}`);
      router.push(`/group/${data.id}`);
    },
    onError: (error) => {
      handleAuthApiError(error, '모임생성에 실패했습니다.');
    },
  });
};
