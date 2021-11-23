import React from 'react';
import { Button } from '@chakra-ui/react'
import { useAddFriend } from "../api";

interface AddFriendProps {
  friendId: string;
  callback?: () => void
}

export const AddFriend = ({ friendId, callback }: AddFriendProps) => {
  const addFriendMutation = useAddFriend({ friendId });

  const handleAddFriend = async () => {
    await addFriendMutation.mutateAsync({ friendId });
    if (callback) {
      callback();
    }
  }

  return (
    <Button
      colorScheme="blue"
      onClick={handleAddFriend}
    >
      Follow
    </Button>
  );
}