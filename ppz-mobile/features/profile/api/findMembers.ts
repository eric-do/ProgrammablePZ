import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { axios } from 'lib';
import { User } from "types";

interface RequestProps {
  limit: number;
  page: number;
  username: string;
}

const findMembers = ({
  page,
  limit,
  username
}: RequestProps): Promise<User[]> => (
  axios.get('/api/users/lookup', {
    params: {
      page,
      limit,
      username
    }
  })
);

interface UseInfiniteSearchOptions {
  options: {
    username: string;
  },
}

export const useMemberSearch = ({
  options = {
    username: ''
  }
}: UseInfiniteSearchOptions) => {
  const { username } = options;
  const queryFn = ({ pageParam = 1 }) => findMembers({
    page: pageParam,
    limit: 20,
    username
  });

  const { data, fetchNextPage, isFetching, error } = useInfiniteQuery(
    ['search', options],
    queryFn,
    {
      select: data => {
        const users: User[] = [...data.pages].flat();
        return { ...data, users }
      },
      getNextPageParam: (_, allPages) => allPages.length + 1
    }
  );
  let users: User[] = data ? [...data.pages].flat() : [];
  return { users, fetchNextPage, isFetching, error };
}