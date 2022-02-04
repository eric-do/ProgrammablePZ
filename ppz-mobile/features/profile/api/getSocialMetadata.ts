import { useQuery } from 'react-query';
import { axios } from 'lib/axios';

interface Metadata {
  friend_count: number;
  follower_count: number;
}

export const getSocialMetadata = (user_id?: string): Promise<Metadata> => {
  return axios.get('/api/friendships/metadata', { params: { user_id } })
};

export const useGetSocialMeta = (user_id?: string) => {
  return useQuery({
    queryKey: 'socialmeta',
    queryFn: () => getSocialMetadata(user_id)
  });
}