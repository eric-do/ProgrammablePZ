import { useState, useEffect } from 'react';
import { useInfiniteQuery, InfiniteData, UseInfiniteQueryOptions } from 'react-query';
import { axios } from 'lib';
import { AuthenticatedUser, Ride } from 'types'
import { AxiosError } from 'axios';

interface RequestProps {
  limit: number;
  page: number;
  user?: string;
}

const getSavedRides = ({ page, limit, user } : RequestProps): Promise<Ride[]>  => {
  return axios.get('/api/rides', {
    params : {
      page,
      limit,
      user
    }
  })
}

interface TransformedResponse extends InfiniteData<Ride[]> {
  rides: Ride[]
}

export const useGetSavedRides = (auth: AuthenticatedUser | null) => {
  const { data, fetchNextPage, isFetching, error } = useInfiniteQuery('savedRides', ({
    pageParam = 1
  }) => getSavedRides({
    page: pageParam,
    limit: 20,
    user: auth?.user.username
  }), {
    select: (data) => {
      const rides: Ride[] = [...data.pages].flat();
      return { ...data, rides };
    },
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  });
  let rides : Ride[] = [];
  if (data) {
    rides = [...data.pages].flat();
  }
  return { rides, fetchNextPage, isFetching, error}
}