import { axios } from 'lib/axios';

interface Metadata {
  friend_count: number;
  follower_count: number;
}

export const getSocialMetadata = (user_id?: string): Promise<Metadata> => {
  return axios.get('/api/friendships/metadata', { params: { user_id } })
};