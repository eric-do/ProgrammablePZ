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