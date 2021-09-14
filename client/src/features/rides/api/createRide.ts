import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';
import { Workout as Ride } from 'types';

export interface CreateRideData {
  data: {
    ride: Ride;
  };
};

export const createRide = ({ data }: CreateRideData ): Promise<Ride> => {
  return axios.post('/api/rides', data);
}

interface UseCreateRideOptions {
  ride: Ride;
  config?: MutationConfig<typeof createRide>
};

export const useCreateRide = ({ config }: UseCreateRideOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => queryClient.invalidateQueries('rides'),
    mutationFn: createRide
  })
}