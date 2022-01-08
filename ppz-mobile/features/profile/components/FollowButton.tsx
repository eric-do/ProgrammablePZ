
import React, { useState } from 'react';
import {
  Button,
  Badge,
  Pressable
} from "native-base"
import { User } from 'types';
import { useStore } from 'store';

interface ButtonProps {
  user: User;
};

export const FollowButton = ({ user }: ButtonProps) => {
  const addFollow = useStore(state => state.addFollow);
  const setFollowing = useStore(state => state.setFollowing)

  const onPress = async () => {
    try {
      console.log('Following')
      await addFollow({ id: user.id });
      setFollowing({ id: user.id });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Pressable onPress={onPress} >
      <Badge variant='outline' colorScheme="orange">Follow</Badge>
    </Pressable>
  );
};