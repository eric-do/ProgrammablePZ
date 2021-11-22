import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';
import { User } from 'types';

export interface AddFriendData {
  user_id: string
};

export const addFriend = ({ user_id }: AddFriendData): Promise<User> => {
  return axios.post(`/api/friendships/create?user_id=${user_id}`, null)
};

interface UseCreateFriendshipOptions {
  // user_id: string;
  config?: MutationConfig<typeof addFriend>
};

export const useAddFriend = ({ config }: UseCreateFriendshipOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => {
      console.log('invalidating')
      queryClient.invalidateQueries('friends');
      queryClient.invalidateQueries('lookup')
    },
    mutationFn: addFriend
  })
}