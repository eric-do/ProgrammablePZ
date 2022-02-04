import React from 'react';
import {
  Box,
  Divider,
  Center,
  Text,
  FlatList
} from "native-base"
import { useStore } from 'store';
import { UserListItem } from '../components';
import { useGetFollowers } from '../api';

export const Followers = () => {
  const auth = useStore(state => state.auth);

  const { followers, isFetching, error, fetchNextPage } = useGetFollowers(auth?.user.id)

  return (
    <Box w='100%' bgColor='white' p='15px'>
      <FlatList
        data={followers}
        renderItem={({ item }) => (
          <UserListItem user={item}  key={item.id}/>
        )}
        onEndReached={() => fetchNextPage()}
        ItemSeparatorComponent={() => <Divider my={0} />}
      />
      {
        followers.length === 0 &&
        <Center>
          <Text>No one is following you yet. Try following other users!</Text>
        </Center>
      }
    </Box>
  );
};