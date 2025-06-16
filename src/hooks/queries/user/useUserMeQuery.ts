import { getUserMe } from '@/lib/user/user';
import { useUserStore } from '@/stores/useUserStore';
import { UserResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUserMeQuery = () => {
  const { setUser, user } = useUserStore((state) => state);

  const query = useQuery<UserResponse>({
    queryKey: ['me', user?.id],
    queryFn: getUserMe,
    retry: true,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
};
