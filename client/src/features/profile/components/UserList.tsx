import React from 'react';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text
} from "@chakra-ui/react";
import { User } from 'types';
import { useAddFriend } from 'features/social/api/addFriend';

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

export const UserListCard = ({ user: { username, id: user_id } }: UserCardProps) => {
  const { mutateAsync: addFriend } = useAddFriend({});

  const handleClick = () => {
    addFriend({ user_id })
  }

  return (
    <Box data-testid="user">
      <Flex>
        <Text>{username}</Text>
        <Spacer />
        <Button colorScheme="blue" onClick={handleClick}>Follow</Button>
      </Flex>
    </Box>
  )
}