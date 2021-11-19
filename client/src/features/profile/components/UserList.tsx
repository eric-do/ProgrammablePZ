import React from 'react';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text
} from "@chakra-ui/react";
import { User } from 'types';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <Box>
      {
        users.map(user => (
          <UserListCard key={user.id} user={user} />
        ))
      }
    </Box>
  )
};

interface UserCardProps {
  user: User
};

export const UserListCard = ({ user: { username, id } }: UserCardProps) => (
  <Box data-testid="user">
    <Flex>
      <Text>{username}</Text>
      <Spacer />
      <Button colorScheme="blue">Follow</Button>
    </Flex>
  </Box>
)