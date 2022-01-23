import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { queryClient } from 'lib/react-query';
import { Ride } from 'types';

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
};

export const useCreateRide = () => {
  return useMutation({
    onSuccess: () => queryClient.invalidateQueries(['rides', 'savedRides']),
    mutationFn: createRide
  })
}