import fetcher from '@/libs/fetcher';
import { User } from '@prisma/client';
import useSWR from 'swr';

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User>(
    '/api/current',
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useUser;
