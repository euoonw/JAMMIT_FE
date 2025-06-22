import { postSendCode } from '@/lib/auth/sendcode';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { logToSentry } from '@/utils/logToSentry';
import { useMutation } from '@tanstack/react-query';

export const useSendCodeMutation = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => postSendCode({ email }),
    onSuccess: (data) => {
      if (data && data.success === false) {
        useToastStore
          .getState()
          .show(data.message || '인증 코드 전송에 실패했습니다.');
        return;
      }
      useToastStore.getState().show('인증 코드가 전송되었습니다.');
    },
    onError: (error) => {
      logToSentry(error, {
        section: 'auth',
        action: 'send_email_code',
      });
      handleAuthApiError(error, '인증 코드 전송 중 오류가 발생했습니다.');
    },
  });
};
