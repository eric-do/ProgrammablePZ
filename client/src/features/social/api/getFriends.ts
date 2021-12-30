import { useInfiniteQuery, useQuery } from 'react-query'
import { axios } from 'lib/axios';
import {
  QueryConfig,
  InfiniteQueryOptions,
  InfiniteQueryConfig
} from 'lib/react-query';
import { User } from 'types';

interface GetFriendsResponse {
  friends: User[]
}

interface GetFriendsOptions {
  user_id: string;
}

export const getFriends = ({user_id}: GetFriendsOptions): Promise<GetFriendsResponse> => {
  return axios.get('/api/friendships/friends', { params: { user_id } })
};

interface UseGetFriendsOptions {
  user_id?: string;
  config?: QueryConfig<typeof getFriends>
};

export const useFriends = ({ user_id='', config }: UseGetFriendsOptions) => {
  return useQuery({
    ...config,
    queryKey: ['friends'],
    queryFn: () => getFriends({user_id})
  })
};

export const getFriendsInfinite = ({
  user_id,
  limit = 20,
  page
}: InfiniteQueryOptions): Promise<User[]> => {
  const offset = (page - 1) * limit;
  return axios.get('/api/friendships/friends', {
    params: {
      user_id,
      limit,
      offset
    }
  })
}

type UseInfiniteFriendsOptions = {
  options: InfiniteQueryOptions;
  config?: InfiniteQueryConfig<typeof getFriendsInfinite>
};

const defaultInfiniteOptions = {
  page: 1,
  limit: 20
};

export const useInfiniteFriends = ({
  options = defaultInfiniteOptions,
  config
}: UseInfiniteFriendsOptions) => {
  const queryFn = ({ pageParam = 1 }) => getFriendsInfinite({
    ...options,
    page: pageParam
  })

  return useInfiniteQuery(
    ['friends', options],
    queryFn,
    {
      ...config,
      queryFn,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1
    }
  )
}