import { putModifiedGatherings } from '@/lib/gathering/modified';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { logToSentry } from '@/utils/logToSentry';
import { useMutation } from '@tanstack/react-query';

export const useGatherModify = () =>
  useMutation({
    mutationFn: putModifiedGatherings,

    onSuccess: () => {
      useToastStore.getState().show('모임 수정 완료되었습니다.');
    },

    onError: (error) => {
      logToSentry(error, {
        section: 'meeting',
        action: 'modified_meeting',
      });
      handleAuthApiError(error, '모임 수정에 실패했습니다.');
    },
  });
