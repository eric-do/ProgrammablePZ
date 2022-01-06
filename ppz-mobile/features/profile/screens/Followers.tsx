import React from 'react';
import {
  Box,
  Divider,
  Center,
  Text
} from "native-base"
import { useStore } from 'store';
import { UserListItem } from '../components';

export const Followers = () => {
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
      {
        followers.length === 0 &&
        <Center>
          <Text>No one is following you yet. Try following other users!</Text>
        </Center>
      }
    </Box>
  );
};