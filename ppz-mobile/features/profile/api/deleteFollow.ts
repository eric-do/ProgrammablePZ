import { axios } from 'lib/axios';

export interface DeleteFollowingData {
  id: string
};

export const deleteFollow = ({ id }: DeleteFollowingData) => {
  return axios.post(`/api/friendships/destroy?user_id=${id}`, null)
};
