import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Divider,
  Badge,
  Slide
} from "native-base"
import { User } from 'types';
import { Ionicons } from '@expo/vector-icons';

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