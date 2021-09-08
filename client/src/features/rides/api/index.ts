import { useQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride} from 'types'
import { QueryConfig } from 'lib/react-query';

export const getRides = (): Promise<Ride[]> => {
  return axios.get('/api/rides');
}

type UseRidesOptions = {
  config?: QueryConfig<typeof getRides>;
};

export const useRides = ({ config }: UseRidesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['rides'],
    queryFn: () => getRides()
  });
}