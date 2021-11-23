import React from 'react';
import { Button } from '@chakra-ui/react'
import { useDeleteFriend } from "../api";

interface DeleteFriendProps {
  friendId: string;
  callback?: () => void
}

export const DeleteFriend = ({ friendId, callback }: DeleteFriendProps) => {
  const deleteFriendMutation = useDeleteFriend({ friendId });

  const handleRemoveFriend = async () => {
    await deleteFriendMutation.mutateAsync({ friendId });
    if (callback) {
      callback();
    }
  }

  return (
    <Button
      colorScheme="green"
      onClick={handleRemoveFriend}
    >
      Unfollow
    </Button>
  );
}