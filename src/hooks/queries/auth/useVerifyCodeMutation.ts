import { postVerifyCode } from '@/lib/auth/verifycode';
import { useToastStore } from '@/stores/useToastStore';
import { useMutation } from '@tanstack/react-query';

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      postVerifyCode({ email, code }),
    onSuccess: (data) => {
      if (data && data.success === false) {
        useToastStore
          .getState()
          .show(data.message || '인증 코드 확인에 실패했습니다.');
        return;
      }
      useToastStore.getState().show('인증 코드가 확인되었습니다.');
    },
  });
};
