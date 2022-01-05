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
  friends: User[];
  limit: number;
  offset: number;
}

export const getFollowing = ({
  user_id,
  limit = 20,
  offset = 0
}: RequestOptions): Promise<User[]> => {
  return axios.get('api/friendships/friends', {
    params: {
      user_id,
      limit,
      offset
    }
  });
};

interface UseGetFollowsProps {
  limit: number;
  offset: number;
}

export const useGetFollows = ({ limit, offset }: UseGetFollowsProps) => {
  const [follows, setFollows] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isPending, setPending] = useState<boolean>(false);
  const id = useStore(state => state.auth?.user.id);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          setPending(true);
          const follows = await getFollowing({
            user_id: id,
            limit,
            offset
          })
          console.log({follows})
          setPending(false);
          setFollows(follows);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    })();
  }, [id])

  return { follows, error, isPending };
}