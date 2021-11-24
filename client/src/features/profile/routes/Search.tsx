import React, { useEffect, useState } from 'react';
import {
  Center,
  Heading,
  Stack,
  Spinner,
  Text
} from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchInput, UserList } from '../components';
import { useInfiniteSearch } from 'features/social/api';
import { useDebounce } from 'hooks/useDebounce';

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
    <Stack
      justifySelf='center'
      width={{
        base: "100%",
        md: "50%",
      }}
    >
      <Heading>Find members</Heading>
      <SearchInput handleSearch={setSearch}/>
      <Center>
        { isLoading && <Spinner /> }
        { error && <Text>Something went wrong.</Text> }
      </Center>
      { data &&
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
      }
    </Stack>
  )
};