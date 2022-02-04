
import React, { useState } from 'react';
import {
  HStack,
  Button,
  Badge,
  Pressable
} from "native-base"
import { User } from 'types';
import { useStore } from 'store';
import { useDeleteFollow } from '../api';

interface ButtonProps {
  user: User;
};

export const UnfollowButton = ({ user }: ButtonProps) => {
  const { mutate } = useDeleteFollow(user.id);

  const onPress = () => mutate();

  return (
    <Pressable onPress={onPress}>
      <Badge variant='outline' colorScheme="orange">Unfollow</Badge>
    </Pressable>
  );
};