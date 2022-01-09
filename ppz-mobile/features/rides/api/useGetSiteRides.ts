import { useState, useEffect } from 'react';
import { useInfiniteQuery, InfiniteData, UseInfiniteQueryOptions } from 'react-query';
import { axios } from '../../../lib'
import { Ride } from '../../../types'
import { AxiosError } from 'axios';

interface RequestProps {
  offset: number;
  limit: number;
}

const getRides = ({ offset, limit} : RequestProps): Promise<Ride[]>  => {
  return axios.get('/api/rides', {
    params : {
      offset,
      limit
    }
  })
}

export const useGetRides = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;

  const getMoreRides = () => setOffset(prev => prev + 1);

  useEffect(() => {
    const fetchRides = async () => {
        try {
          setPending(true);
          const rides = await getRides({ offset, limit });
          setPending(false)
          setRides(rides);
        } catch (err) {
          setError(true);
        }
      }
    fetchRides();
  }, [offset])
  return { rides, isPending, error, getMoreRides }
}

interface TransformedResponse extends InfiniteData<Ride[]> {
  rides: Ride[]
}

export const useInfiniteRides = () => {
  const { data, fetchNextPage, isFetching, error } = useInfiniteQuery('site-rides', ({
    pageParam = 0
  }) => getRides({
    offset: pageParam,
    limit: 20
  }), {
    select: (data) => {
      const rides: Ride[] = [...data.pages].flat();
      return { ...data, rides };
    },
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })
  let rides : Ride[] = [];
  if (data) {
    rides = [...data.pages].flat();
  }
  return { rides, fetchNextPage, isFetching, error}
}