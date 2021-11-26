import { useQuery } from 'react-query'
import { axios } from 'lib/axios';
import {
  QueryConfig,
} from 'lib/react-query';
import { User } from 'types';

interface GetFollowersResponse {
  followers: User[]
}

interface GetFollowersOptions {
  user_id: string;
}

export const getFollowers = ({user_id}: GetFollowersOptions): Promise<GetFollowersResponse> => {
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