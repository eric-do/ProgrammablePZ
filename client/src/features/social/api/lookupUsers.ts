import { useQuery, useInfiniteQuery } from 'react-query';
import { axios } from 'lib/axios';
import { User } from 'types'
import {
  QueryConfig,
  QueryOptions,
  InfiniteQueryOptions,
  InfiniteQueryConfig
} from 'lib/react-query';

interface LookupOptions extends QueryOptions{
  username: string;
}

export const lookupUsers = (
  {
    limit = 10,
    username = ''
  }: LookupOptions
): Promise<User[]> => {
  return axios.get('/api/users/lookup', {
    params: {
      limit,
      username
    }
  });
}

type UseLookupUsersOptions = {
  options: LookupOptions;
  config?: QueryConfig<typeof lookupUsers>;
};

const defaultOptions = {
  username: ''
};

export const useLookupUsers = ({ options = defaultOptions, config }: UseLookupUsersOptions) => {
  return useQuery({
    ...config,
    queryKey: ['lookup', options],
    queryFn: () => lookupUsers(options)
  });
}

// Infinite Scroll
interface LookupOptionsInfinite extends InfiniteQueryOptions{
  username: string;
}

export const getUsersInfinite = ({
  limit = 5,
  page,
  username
}: LookupOptionsInfinite): Promise<User[]> => {
  const offset = (page - 1) * limit;

  return axios.get('/api/rides', {
    params: {
      username,
      limit,
      offset
    }
  });
}

type UseInfiniteRidesOptions = {
  options: LookupOptionsInfinite;
  config?: InfiniteQueryConfig<typeof getUsersInfinite>;
};

const defaultInfiniteOptions = {
  page: 1,
  limit: 5,
  username: ''
}

export const useInfiniteRides = ({
  options = defaultInfiniteOptions,
  config
}: UseInfiniteRidesOptions) => {

  const queryFn = ({ pageParam = 1 }) => getUsersInfinite({
    ...options,
    page: pageParam
  });

  return useInfiniteQuery(
    ['users', options],
    queryFn,
    { ...config,
      queryFn,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1
    }
  );
}