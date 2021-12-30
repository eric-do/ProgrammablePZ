import React from 'react';
import {
  Box,
  Center,
  Spinner,
  Text
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteFriends } from '../api';
import { useAuth } from 'lib/auth';
import { UserList } from 'features/profile/components';
import { Page } from 'components';

export const Following = () => {
  const { user } = useAuth();
  const {
    data,
    error,
    isLoading,
    fetchNextPage } = useInfiniteFriends({
    options: {
      user_id: user?.id,
      page: 1,
      limit: 20
    }
  });
  console.log(data)
  return (
    <Page title="Friends">
      { isLoading && <Center><Spinner /></Center> }
      { error && <Text>Something went wrong.</Text> }
      { data &&
        <Box w="100%">
          <InfiniteScroll
          dataLength={data.pages.length}
          next={fetchNextPage}
          hasMore={data.pages[data.pages.length - 1].length > 0}
          loader={<span></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>

            </p>
          }
        >
          {
            data.pages.map((users, i) => (
              <UserList key={i} users={users} />
            ))
          }
      </InfiniteScroll>
        </Box>
      }
      { data?.pages[0].length === 0 && <Text>You're not following anyone yet!</Text>}
    </Page>
  )
}