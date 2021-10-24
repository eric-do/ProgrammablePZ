import { useQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride } from 'types';
import {
  QueryConfig,
  QueryOptions
} from 'lib/react-query';

export const getUserRides = ({
  user,
  limit = 3,
  sort = 'recent'
}: QueryOptions): Promise<Ride[]> => {
  return axios.get(`/api/user/${user}/rides`, {
    params: {
      limit,
      sort
    }
  })
};

type UseUserRidesOptions = {
  options: QueryOptions;
  config?: QueryConfig<typeof getUserRides>;
};

export const useUserRides = ({ options, config }: UseUserRidesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['user-rides', options],
    queryFn: () => getUserRides(options)
  })
}