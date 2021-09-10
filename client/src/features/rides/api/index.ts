import { useQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride} from 'types'
import { QueryConfig, QueryOptions } from 'lib/react-query';

export const getRides = (
  {
    limit = 10,
    type = 'pz,pzm,pze,ftp',
    timeInSeconds ='1200,1800,2700,3600'
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

const defaultOptions = {
  limit: 10,
  type: 'pz,pzm,pze,ftp',
  timeInSeconds: '1200,1800,2700,3600'
}

export const useRides = ({ options = defaultOptions, config }: UseRidesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['rides', options],
    queryFn: () => getRides(options)
  });
}