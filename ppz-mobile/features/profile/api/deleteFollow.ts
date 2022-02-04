import { useMutation } from 'react-query';
import { axios, queryClient } from 'lib';

export const deleteFollow = (id: string) => {
  return axios.post(`/api/friendships/destroy?user_id=${id}`, null)
};

export const useDeleteFollow = (id: string) => {
  return useMutation(() => deleteFollow(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('search');
      queryClient.invalidateQueries('followers');
      queryClient.invalidateQueries('following');
      queryClient.invalidateQueries('socialmeta');
    }
  });
}