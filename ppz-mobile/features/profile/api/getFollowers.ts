import { useInfiniteQuery } from 'react-query';
import { axios } from 'lib';
import { User } from 'types';

interface RequestOptions {
  page?: number;
  user_id?: string;
  limit?: number;
  offset?: number;
}

export const getFollowers = ({
  page = 1,
  user_id,
  limit = 20,
}: RequestOptions): Promise<User[]> => {
  return axios.get('api/friendships/followers', {
    params: {
      user_id,
      limit,
      page
    }
  });
};

export const useGetFollowers = (user_id?: string) => {
  const { data, fetchNextPage, isFetching, error } =  useInfiniteQuery(
    'followers',
    ({ pageParam = 1 }) => getFollowers({ user_id, page: pageParam }),
    {
      select: data => {
        const users: User[] = [...data.pages].flat();
        return { ...data, users }
      },
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
      enabled: !!user_id
    }
  );

  const followers: User[] = data ? [...data.pages].flat() : [];
  return { followers, isFetching, fetchNextPage, error };
}