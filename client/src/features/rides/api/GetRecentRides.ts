import { useQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride } from 'types';
import {
  QueryConfig,
  QueryOptions
} from 'lib/react-query';

export const getRecentRides = ({
  userId,
  limit = 3,
  sort = 'recent'
}: QueryOptions): Promise<Ride[]> => {
  return axios.get(`/api/users/${userId}/rides_taken`, {
    params: {
      limit,
      sort
    }
  })
};

type UseRecentRidesOptions = {
  options: QueryOptions;
  config?: QueryConfig<typeof getRecentRides>;
};

export const useRecentRides = ({ options, config }: UseRecentRidesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['user-rides', options],
    queryFn: () => getRecentRides(options)
  })
}