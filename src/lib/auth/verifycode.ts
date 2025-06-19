import { apiClient } from '@/utils/apiClient';

interface VerifyemailRequest {
  email: string;
  code: string;
}

interface VerifyemailResponse {
  success: boolean;
  message: string;
}

export async function postVerifyCode({
  email,
  code,
}: VerifyemailRequest): Promise<VerifyemailResponse> {
  return await apiClient.post<VerifyemailResponse>('/auth/email/verify-code', {
    email,
    code,
  });
}
