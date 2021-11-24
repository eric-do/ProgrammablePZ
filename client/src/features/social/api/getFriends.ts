import { useQuery } from 'react-query'
import { axios } from 'lib/axios';
import {
  QueryConfig,
} from 'lib/react-query';
import { User } from 'types';

interface GetFriendsResponse {
  friends: User[]
}

interface GetRideOptions {
  user_id: string;
}

export const getFriends = ({user_id}: GetRideOptions): Promise<GetFriendsResponse> => {
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