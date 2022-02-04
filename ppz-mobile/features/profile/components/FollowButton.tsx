
import React from 'react';
import {
  Button,
  Badge,
  Pressable
} from "native-base"
import { User } from 'types';
import { useStore } from 'store';
import { useAddFollow } from '../api';

interface ButtonProps {
  user: User;
};

export const FollowButton = ({ user }: ButtonProps) => {
  const { mutate, error } = useAddFollow(user.id);

  const onPress = () => mutate();

  return (
    <Pressable onPress={onPress} >
      <Badge variant='outline' colorScheme="orange">Follow</Badge>
    </Pressable>
  );
};