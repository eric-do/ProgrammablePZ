import React, { useState, useEffect, useCallback } from 'react';
import {
  Center,
  Heading,
  Stack,
  Spinner,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { SearchInput, UserList } from '../components';
import { useLookupUsers } from 'features/social/api/lookupUsers';
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

  useDebounce(refetch, 1000, [search]);

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