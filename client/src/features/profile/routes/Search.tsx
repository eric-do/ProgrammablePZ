import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Spinner,
  Text
} from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchInput, UserList } from '../components';
import { useInfiniteSearch } from 'features/social/api';
import { useDebounce } from 'hooks/useDebounce';
import { Page } from 'components';

export const Search = () => {
  const [search, setSearch] = useState('');
  const {
    data,
    fetchNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteSearch({
    options: {
      username: search,
      page: 1,
      limit: 20
    }
  });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    refetch();
  }, [debouncedSearch, refetch])

  return (
    <Page title="Find members" >
      <SearchInput handleSearch={setSearch}/>
      <Center>
        { isLoading && <Spinner mt={10} />}
        { error && <Text mt={10} >Something went wrong.</Text> }
      </Center>
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
    </Page>
  )
};