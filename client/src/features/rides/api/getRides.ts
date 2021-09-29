import { useQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride} from 'types'
import { QueryConfig, QueryOptions } from 'lib/react-query';

export const getRides = (
  {
    user,
    limit = 10,
    type,
    timeInSeconds
  }: QueryOptions
): Promise<Ride[]> => {
  return axios.get('/api/rides', {
    params: {
      limit,
      type,
      timeInSeconds,
      user
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