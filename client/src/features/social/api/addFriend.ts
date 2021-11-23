import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';
import { User } from 'types';

export interface AddFriendData {
  friendId: string
};

export const addFriend = ({ friendId }: AddFriendData): Promise<User> => {
  return axios.post(`/api/friendships/create?user_id=${friendId}`, null)
};

interface UseCreateFriendshipOptions {
  friendId: string;
  config?: MutationConfig<typeof addFriend>
};

export const useAddFriend = ({ config }: UseCreateFriendshipOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries('friends');
      queryClient.invalidateQueries('lookup')
    },
    mutationFn: addFriend
  })
}