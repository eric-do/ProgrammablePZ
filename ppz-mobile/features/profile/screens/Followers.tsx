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
import { Ionicons } from '@expo/vector-icons';
import { useStore } from 'store';
import { UserListItem } from '../components';

export const Followers = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const followers = useStore(state => state.followers)

  return (
    <Box w='100%' bgColor='white' p='15px'>
      {
        followers.map((follower, idx) => (
          <Box key={follower.id}>
            <UserListItem user={follower}  />
            { idx < followers.length - 1 && <Divider my={0} />}
          </Box>
        ))
      }
      <Slide in={isOpen} placement='bottom'>
        <Box bgColor='white'>
          <Heading>Follow options</Heading>
        </Box>
      </Slide>
    </Box>
  );
};