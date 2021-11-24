import { useInfiniteQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Workout as Ride} from 'types'
import {
  InfiniteQueryOptions,
  InfiniteQueryConfig
} from 'lib/react-query';

export const getTimelineInfinite = ({
  limit = 10,
  page
}: InfiniteQueryOptions): Promise<Ride[]> => {
  const offset = (page - 1) * limit;

  return axios.get('/api/timeline', {
    params: {
      limit,
      offset
    }
  });
}

type UseInfiniteRidesOptions = {
  options: InfiniteQueryOptions;
  config?: InfiniteQueryConfig<typeof getTimelineInfinite>;
};

const defaultInfiniteOptions = {
  page: 1,
  limit: 5
}

export const useInfiniteTimeline = ({
  options = defaultInfiniteOptions,
  config }: UseInfiniteRidesOptions) => {

  const queryFn = ({ pageParam = 1 }) => getTimelineInfinite({
    ...options,
    page: pageParam
  });

  return useInfiniteQuery(
    ['timeline', options],
    queryFn,
    { ...config,
      queryFn,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1
    }
  );
}