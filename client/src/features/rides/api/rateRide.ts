import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';

export interface RateRideData {
  rideId: number | undefined;
  ratings: {
    rating: number | null;
    difficulty: number | null;
  }
};

const rateRide = ({ rideId, ratings: { rating, difficulty } }: RateRideData) => {
  return axios.post(`/api/rides/${rideId}/ratings`, { rating, difficulty });
};

interface RateRideOptions {
  rideId: number | undefined;
  ratings: {
    rating: number | null;
    difficulty: number | null;
  }
  config?: MutationConfig<typeof rateRide>
}

export const useRateRide = ({ config }: RateRideOptions) => {
  return useMutation({
    ...config,
    onSuccess: () => queryClient.invalidateQueries('rides'),
    mutationFn: rateRide
  })
}