import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';

export interface RemoveFriendData {
  friendId: string
};

export const deleteFriend = ({ friendId }: RemoveFriendData) => {
  return axios.post(`/api/friendships/destroy?user_id=${friendId}`, null)
};

type UseDeleteFriendOptions = {
  friendId: string;
  config?: MutationConfig<typeof deleteFriend>;
};

export const useDeleteFriend = ({ config }: UseDeleteFriendOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
      queryClient.invalidateQueries('users');
    },
    mutationFn: deleteFriend
  })
}