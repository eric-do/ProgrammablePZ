import { useQuery } from 'react-query'
import { axios } from 'lib/axios';
import { QueryConfig } from 'lib/react-query';

interface Metadata {
  friend_count: number;
  follower_count: number;
}

export const getFriendsMetadata = (user_id?: string): Promise<Metadata> => {
  return axios.get('/api/friendships/metadata', { params: { user_id } })
};

interface UseGetFriendsMetaOptions {
  user_id?: string;
  config?: QueryConfig<typeof getFriendsMetadata>
};

export const useGetMetadata = ({ user_id, config }: UseGetFriendsMetaOptions) => {
  return useQuery({
    ...config,
    queryKey: ['metadata'],
    queryFn: () => getFriendsMetadata(user_id)
  })
};