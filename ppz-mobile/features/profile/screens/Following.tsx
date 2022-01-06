import React from 'react';
import {
  Box,
  Text,
  Center,
  Divider
} from "native-base"
import { useStore } from 'store';
import { UserListItem } from '../components';

export const Following = () => {
  const following = useStore(state => state.following)

  return (
    <Box w='100%' bgColor='white' p='15px'>
      {
        following.map((follow, idx) => (
          <Box key={follow.id}>
            <UserListItem user={follow}  />
            { idx < following.length - 1 && <Divider my={0} />}
          </Box>
        ))
      }
      {
        following.length === 0 &&
        <Center>
          <Text>You're not following anyone yet. Try searching for users to follow!</Text>
        </Center>
      }
    </Box>
  );
};