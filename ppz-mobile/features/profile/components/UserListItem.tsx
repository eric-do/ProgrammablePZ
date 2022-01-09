import React from 'react';
import {
  Text,
  HStack,
} from "native-base"
import { User } from 'types';
import { FollowButton } from 'features/profile/components/FollowButton';
import { UnfollowButton } from 'features/profile/components/UnfollowButton';

interface ItemProps {
  user: User;

};

export const UserListItem = ({ user}: ItemProps) => {

  return (
    <HStack alignContent='center' justifyContent='space-between' my={3}>
      <Text>{user.username}</Text>
      <HStack alignItems='center'>
        { user.is_friend &&
          <FollowButton user={user} />
        }
        { !user.is_friend &&
          <UnfollowButton user={user} />
        }
      </HStack>
    </HStack>
  );
};