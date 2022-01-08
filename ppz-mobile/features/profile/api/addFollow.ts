import { axios } from 'lib/axios';
import { User } from 'types';

export interface AddFollowingData {
  id: string
};

export const addFollow = ({ id }: AddFollowingData): Promise<User> => {
  return axios.post(`/api/friendships/create?user_id=${id}`, null)
};