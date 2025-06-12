function hasStringMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  );
}

function hasMetaErrorMessage(meta: unknown): meta is { errorMessage: string } {
  return (
    typeof meta === 'object' &&
    meta !== null &&
    'errorMessage' in meta &&
    typeof (meta as { errorMessage?: unknown }).errorMessage === 'string'
  );
}

export function extractErrorMessage(error: unknown): string {
  if (!error) return '알 수 없는 오류가 발생했습니다.';

  if (error instanceof Error) {
    return error.message || '에러가 발생했습니다.';
  }

  if (hasStringMessage(error)) {
    return error.message;
  }

  return '에러가 발생했습니다.';
}

export function extractMetaErrorMessage(meta: unknown): string | undefined {
  if (hasMetaErrorMessage(meta)) {
    return meta.errorMessage;
  }
  return undefined;
}
