import { useMutation } from '@tanstack/react-query';
import { postRegisterGatherings } from '@/lib/gathering/register';
import { handleAuthApiError } from '@/utils/authApiError';
import {
  RegisterGatheringsRequest,
  RegisterGatheringsResponse,
} from '@/types/gather';

export const useGatherRegister = () => {
  return useMutation<
    RegisterGatheringsResponse,
    Error,
    RegisterGatheringsRequest
  >({
    mutationFn: postRegisterGatherings,
    onSuccess: () => {
      alert('모임이 성공적으로 생성되었습니다.');
    },
    onError: (error) => {
      handleAuthApiError(error, '모임생성에 실패했습니다.');
    },
  });
};
