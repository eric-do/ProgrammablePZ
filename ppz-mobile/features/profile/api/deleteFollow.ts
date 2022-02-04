import { axios, queryClient } from 'lib';
import { User } from 'types';
import { useMutation } from 'react-query';

export const deleteFollow = (id: string) => {
  return axios.post(`/api/friendships/destroy?user_id=${id}`, null)
};

export const useDeleteFollow = (id: string) => {
  return useMutation(() => deleteFollow(id), {
    onSuccess: () => { queryClient.invalidateQueries('search')}
  });
}