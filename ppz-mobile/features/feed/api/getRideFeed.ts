import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { axios } from 'lib/axios';
import { Ride } from 'types'

export const getTimeline = ({
  limit = 10,
  offset = 0
}): Promise<Ride[]> => {
  return axios.get('/api/me/timeline', {
    params: {
      limit,
      offset
    }
  });
}

export const useGetTimeline = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0)
  const limit = 20;

  const incrementPage = () => setOffset(prev => prev + 1);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const rides = await getTimeline({ limit, offset });
        setRides(rides)
        setError(false);
      } catch (err) {
        setError(true);
      }
    }
    fetchTimeline();
  }, [offset])
  return { rides, error, incrementPage };
}