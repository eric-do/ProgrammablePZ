import React, { useState } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Text
} from "@chakra-ui/react";
import { User } from 'types';
import { AddFriend, DeleteFriend } from 'features/social/components'

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
  user: User;
};

export const UserListCard = ({ user: { username, id: friendId, is_friend } }: UserCardProps) => {
  const [isFriend, setFriend] = useState(is_friend);

  const handleAddFriend = () => setFriend(true);
  const handleRemoveFriend = () => setFriend(false);

  return (
    <Box data-testid="user">
      <Flex>
        <Text>{username}</Text>
        <Spacer />
        { isFriend && <DeleteFriend friendId={friendId} callback={handleRemoveFriend} /> }
        { !isFriend && <AddFriend friendId={friendId} callback={handleAddFriend} /> }
      </Flex>
    </Box>
  )
}