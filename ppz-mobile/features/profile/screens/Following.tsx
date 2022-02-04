import React from 'react';
import {
  Box,
  Text,
  Center,
  Divider,
  FlatList
} from "native-base"
import { useStore } from 'store';
import { UserListItem } from '../components';
import { useGetFollowing } from '../api'

export const Following = () => {
  const auth = useStore(state => state.auth);

  const { following, isFetching, error, fetchNextPage } = useGetFollowing(auth?.user.id);

  return (
    <Box w='100%' bgColor='white' p='15px'>
      <FlatList
        data={following}
        renderItem={({ item }) => (
          <UserListItem user={item} key={item.id} />
        )}
        onEndReached={() => fetchNextPage()}
        ItemSeparatorComponent={() => <Divider my={0} />}
      />
      {
        following.length === 0 &&
        <Center>
          <Text>You're not following anyone yet. Try searching for users to follow!</Text>
        </Center>
      }
    </Box>
  );
};