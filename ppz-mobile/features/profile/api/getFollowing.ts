import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { User } from 'types';
import { axios } from 'lib';
import { useStore } from 'store';

interface RequestOptions {
  user_id?: string;
  limit?: number;
  offset?: number;
  page?: number;
}

export const getFollowing = ({
  user_id,
  limit = 20,
  page = 1,
}: RequestOptions): Promise<User[]> => {
  return axios.get('api/friendships/friends', {
    params: {
      user_id,
      limit,
      page
    }
  });
};

export const useGetFollowing = (user_id?: string) => {
  const { data, fetchNextPage, isFetching, error } =  useInfiniteQuery(
    'following',
    ({ pageParam = 1 }) => getFollowing({ user_id, page: pageParam }),
    {
      select: data => {
        const users: User[] = [...data.pages].flat();
        return { ...data, users }
      },
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
      enabled: !!user_id
    }
  );

  const following: User[] = data ? [...data.pages].flat() : [];
  return { following, isFetching, fetchNextPage, error };
}