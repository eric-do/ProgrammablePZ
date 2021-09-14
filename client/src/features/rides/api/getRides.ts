import { useQuery, useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride} from 'types'
import { QueryConfig, QueryOptions } from 'lib/react-query';

export const getRides = (
  {
    limit = 10,
    type,
    timeInSeconds
  }: QueryOptions
): Promise<Ride[]> => {
  return axios.get('/api/rides', {
    params: {
      limit,
      type,
      timeInSeconds
    }
  });
}

type UseRidesOptions = {
  options: QueryOptions;
  config?: QueryConfig<typeof getRides>;
};

const defaultOptions = { limit: 10 }

export const useRides = ({ options = defaultOptions, config }: UseRidesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['rides', options],
    queryFn: () => getRides(options)
  });
}

export const incrementRideCount = (rideId: number) => {
  return axios.post(`/api/rides/${rideId}/ride-count`);
}

export const useRideCount = (rideId: number) => {
  return useMutation(() => incrementRideCount(rideId), {
    onSuccess: () => {}
  });
}