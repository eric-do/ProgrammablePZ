import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';

export interface IncrementRideData {
  data: {
    rideId: number;
  };
};

export const incrementRideCount = ({ data }: IncrementRideData ) => {
  const { rideId } = data;
  return axios.post(`/api/rides/${rideId}/ride-count`);
}

interface IncrementRideOptions {
  rideId: number | undefined;
  config?: MutationConfig<typeof incrementRideCount>
};

export const useIncrementRideCount = ({ config }: IncrementRideOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => queryClient.invalidateQueries('rides'),
    mutationFn: incrementRideCount
  })
}