import { apiClient } from '@/utils/apiClient';

interface SendemailRequest {
  email: string;
}

interface SendemailResponse {
  success: boolean;
  message: string;
}

export async function postSendCode({
  email,
}: SendemailRequest): Promise<SendemailResponse> {
  return await apiClient.post<SendemailResponse>('/auth/email/send-code', {
    email,
  });
}
