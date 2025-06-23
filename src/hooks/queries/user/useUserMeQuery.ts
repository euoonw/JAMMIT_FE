import { getUserMe } from '@/lib/user/user';
import { useUserStore } from '@/stores/useUserStore';
import { UserResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { userKeys } from '../queryKeys';

interface UseUserMeQueryOptions {
  enabled?: boolean;
}

export const useUserMeQuery = ({
  enabled = true,
}: UseUserMeQueryOptions = {}) => {
  const { setUser } = useUserStore((state) => state);

  const query = useQuery<UserResponse>({
    queryKey: userKeys.me(),
    queryFn: getUserMe,
    retry: true,
    enabled,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
};
