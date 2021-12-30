import { useInfiniteQuery, useQuery } from 'react-query'
import { axios } from 'lib/axios';
import {
  QueryConfig,
  InfiniteQueryOptions,
  InfiniteQueryConfig
} from 'lib/react-query';
import { User } from 'types';

interface GetFollowersResponse {
  followers: User[]
}

interface GetFollowersOptions {
  user_id: string;
}

export const getFollowers = ({ user_id }: GetFollowersOptions): Promise<GetFollowersResponse> => {
  return axios.get('/api/friendships/followers', { params: { user_id } })
};

interface UseGetFriendsOptions {
  user_id?: string;
  config?: QueryConfig<typeof getFollowers>
};

export const useGetFollowers = ({ user_id='', config }: UseGetFriendsOptions) => {
  return useQuery({
    ...config,
    queryKey: ['followers'],
    queryFn: () => getFollowers({ user_id })
  })
};

export const getFollowersInfinite = ({
  user_id,
  limit = 20,
  page
}: InfiniteQueryOptions): Promise<User[]> => {
  const offset = (page - 1) * limit;
  return axios.get('/api/friendships/followers', {
    params: {
      user_id,
      limit,
      offset
    }
  })
}

type UseInfiniteFollowersOptions = {
  options: InfiniteQueryOptions;
  config?: InfiniteQueryConfig<typeof getFollowersInfinite>
};

const defaultInfiniteOptions = {
  page: 1,
  limit: 20
};

export const useInfiniteFollowers = ({
  options = defaultInfiniteOptions,
  config
}: UseInfiniteFollowersOptions) => {
  const queryFn = ({ pageParam = 1 }) => getFollowersInfinite({
    ...options,
    page: pageParam
  })

  return useInfiniteQuery(
    ['followers', options],
    queryFn,
    {
      ...config,
      queryFn,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1
    }
  )
}