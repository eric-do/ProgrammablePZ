
import React, { useState } from 'react';
import {
  HStack,
  Button,
  Badge,
  Pressable
} from "native-base"
import { User } from 'types';
import { useStore } from 'store';

interface ButtonProps {
  user: User;
};

export const UnfollowButton = ({ user }: ButtonProps) => {
  const deleteFollow = useStore(state => state.deleteFollow);
  const setFollowers = useStore(state => state.setFollowers);

  const onPress = async () => {
    try {
      await deleteFollow({ id: user.id });
      setFollowers({ id: user.id })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Pressable onPress={onPress}>
      <Badge variant='outline' colorScheme="orange">Unfollow</Badge>
    </Pressable>
  );
};