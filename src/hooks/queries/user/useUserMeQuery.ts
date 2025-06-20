import { getUserMe } from '@/lib/user/user';
import { useUserStore } from '@/stores/useUserStore';
import { UserResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { userKeys } from '../queryKeys';

export const useUserMeQuery = () => {
  const { setUser, isLoaded, isRefreshing } = useUserStore((state) => state);
  const isQueryReady = isLoaded && !isRefreshing;

  const query = useQuery<UserResponse>({
    queryKey: userKeys.me(),
    queryFn: getUserMe,
    retry: true,
    enabled: isQueryReady,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
};
