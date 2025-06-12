import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { useErrorModalStore } from '@/stores/useErrorModalStore';
import {
  extractErrorMessage,
  extractMetaErrorMessage,
} from '@/utils/errorParser';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const metaMessage = extractMetaErrorMessage(query?.meta);
      const errorMessage =
        extractErrorMessage(error) || metaMessage || '데이터 로드 실패';
      useErrorModalStore.getState().open(errorMessage);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      const metaMessage = extractMetaErrorMessage(mutation?.meta);
      const errorMessage =
        extractErrorMessage(error) || metaMessage || '요청 실패';
      useErrorModalStore.getState().open(errorMessage);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
