import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';
import { User } from 'types';

export interface AddFriendData {
  data: {
    user_id: string
  }
};

export const addFriend = ({ data }: AddFriendData): Promise<User> => {
  const { user_id } = data;
  return axios.post(`/api/friendships/create?user_id=${user_id}`, null)
};

interface UseCreateFriendshipOptions {
  user_id: string;
  config?: MutationConfig<typeof addFriend>
};

export const useCreateRide = ({ config }: UseCreateFriendshipOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => queryClient.invalidateQueries('friends'),
    mutationFn: addFriend
  })
}