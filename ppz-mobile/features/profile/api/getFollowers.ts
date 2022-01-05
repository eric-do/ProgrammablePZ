import React, { useEffect, useState } from 'react';
import { User } from 'types';
import { axios } from 'lib';
import { useStore } from 'store';

interface RequestOptions {
  user_id: string;
  limit: number;
  offset: number;
}

interface RequestResponse {
  followers: User[];
}

export const getFollowers = ({
  user_id,
  limit = 20,
  offset = 0
}: RequestOptions): Promise<User[]> => {
  return axios.get('api/friendships/followers', {
    params: {
      user_id,
      limit,
      offset
    }
  });
};

interface RequestParams {
  limit: number;
  offset: number;
}

export const useGetFollowers = ({ limit, offset }: RequestParams) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isPending, setPending] = useState<boolean>(false);
  const auth = useStore(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        if (auth) {
          setPending(true);
          const followers = await getFollowers({
            user_id: auth?.user.id,
            limit: 20,
            offset: 0
          });
          setPending(false);
          setFollowers(followers);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    })();
  })

  return { followers, error, isPending };
}