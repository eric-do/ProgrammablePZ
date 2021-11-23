import React, { useEffect, useState } from 'react';
import {
  Center,
  Heading,
  Stack,
  Spinner,
  Text
} from "@chakra-ui/react";
import { SearchInput, UserList } from '../components';
import { useLookupUsers } from 'features/social/api';
import { useDebounce } from 'hooks/useDebounce';

export const Search = () => {
  const [search, setSearch] = useState('');
  const { data: users, isLoading, error, refetch } = useLookupUsers({
    options: {
      username: search
    },
    config: {
      enabled: false
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
      { users && <UserList users={users} /> }
    </Stack>
  )
};