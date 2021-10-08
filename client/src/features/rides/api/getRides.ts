import { useQuery, useInfiniteQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride} from 'types'
import {
  QueryConfig,
  QueryOptions,
  InfiniteQueryOptions,
  InfiniteQueryConfig
} from 'lib/react-query';

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

const defaultOptions = { limit: 10 };

export const useRides = ({ options = defaultOptions, config }: UseRidesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['rides', options],
    queryFn: () => getRides(options)
  });
}



export const getRidesInfinite = ({
  user,
  cursor,
  type,
  timeInSeconds
}: InfiniteQueryOptions): Promise<Ride[]> => {
  console.log(cursor)
  return axios.get('/api/rides', {
    params: {
      user,
      cursor,
      type,
      timeInSeconds,
    }
  });
}

type UseInfiniteRidesOptions = {
  options: InfiniteQueryOptions;
  config?: InfiniteQueryConfig<typeof getRidesInfinite>;
};

const defaultInfiniteOptions = {
  cursor: 1
}

export const useInfiniteRides = ({
  options = defaultInfiniteOptions,
  config }: UseInfiniteRidesOptions) => {

  const queryFn = ({ pageParam = 1 }) => getRidesInfinite({ ...options, cursor: pageParam});

  return useInfiniteQuery(
    ['rides', options],
    queryFn,
    { ...config,
      queryFn,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    }
  );
}