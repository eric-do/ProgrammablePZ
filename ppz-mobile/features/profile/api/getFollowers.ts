import React, { useEffect, useState } from 'react';
import { User } from 'types';
import { axios } from 'lib';

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