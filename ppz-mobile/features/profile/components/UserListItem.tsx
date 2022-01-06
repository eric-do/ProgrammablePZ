import React, { useState } from 'react';
import {
  Text,
  HStack,
  Badge,
} from "native-base"
import { User } from 'types';

interface ItemProps {
  user: User;

};

export const UserListItem = ({ user}: ItemProps) => {

  return (
    <HStack alignContent='center' justifyContent='space-between' my={3}>
      <Text>{user.username}</Text>
      <HStack alignItems='center'>
        { user.is_friend &&
            <Badge variant='solid' colorScheme="orange">Following</Badge>
        }
        { !user.is_friend &&
          <Badge variant='outline' colorScheme="orange">Follow Back</Badge>
        }
      </HStack>
    </HStack>
  );
};