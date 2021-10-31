import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';

export interface addRidesTakenData {
  data: {
    rideId: number | undefined;
    userId: string;
  };
};

export const addRidesTakenByUser = ({ data }: addRidesTakenData ) => {
  const { userId, rideId } = data;
  return axios.post(`/api/users/${userId}/rides_taken`, { rideId });
}

interface addRidesTakenByUserOptions {
  rideId: number | undefined;
  userId: string | undefined;
  config?: MutationConfig<typeof addRidesTakenByUser>
};

export const useRidesTakenByUser = ({ config }: addRidesTakenByUserOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => queryClient.invalidateQueries('rides'),
    mutationFn: addRidesTakenByUser
  })
}