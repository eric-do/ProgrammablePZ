import { useQuery } from 'react-query'
import { axios } from 'lib/axios';
import {
  QueryConfig,
} from 'lib/react-query';
import { User } from 'types';

export const getFriends = (user_id?: string): Promise<User[]> => {
  return axios.get('/api/friendships/friends', { params: { user_id } })
};

interface UseGetFriendsOptions {
  user_id?: string;
  config?: QueryConfig<typeof getFriends>
};

export const useFriends = ({ config }: UseGetFriendsOptions) => {
  return useQuery({
    ...config,
    queryKey: ['friends'],
    queryFn: () => getFriends()
  })
};