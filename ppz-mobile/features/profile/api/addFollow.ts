import { axios, queryClient } from 'lib';
import { User } from 'types';
import { useMutation } from 'react-query';

export const addFollow = (id: string): Promise<User> => {
  return axios.post(`/api/friendships/create?user_id=${id}`, null)
};

export const useAddFollow = (id: string) => {
  return useMutation(() => addFollow(id), {
    onSuccess: () => { queryClient.invalidateQueries('search')}
  });
}