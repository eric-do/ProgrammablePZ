import React from 'react';
import {
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import { useGetFollowers } from '../api';
import { useAuth } from 'lib/auth';
import { UserList } from 'features/profile/components';

export const Followers = () => {
  const { user } = useAuth();

  const { data, error, isLoading } = useGetFollowers({ user_id: user?.id })

  return (
    <Flex justify='center'>
      <Stack width={{
        base: "100%",
        md: "30%",
      }}>
      <Heading size="lg" pb={3}>Followers</Heading>
      { isLoading && <Center><Spinner /></Center> }
      { error && <Text>Something went wrong.</Text> }
      { data && <UserList users={data.followers} />  }
    </Stack>
    </Flex>
  )
}