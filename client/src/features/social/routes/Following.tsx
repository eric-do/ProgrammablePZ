import React from 'react';
import {
  Center,
  Heading,
  Spinner,
  Stack,
  Flex,
  Text
} from '@chakra-ui/react';
import { useFriends } from '../api';
import { useAuth } from 'lib/auth';
import { UserList } from 'features/profile/components';

export const Following = () => {
  const { user } = useAuth();

  const { data, error, isLoading } = useFriends({ user_id: user?.id })

  return (
    <Flex justify='center'>
      <Stack width={{
        base: "100%",
        md: "30%",
      }}>
        <Heading size="lg" pb={3} >Friends</Heading>
        { isLoading && <Center><Spinner /></Center> }
        { error && <Text>Something went wrong.</Text> }
        { data && <UserList users={data.friends} />  }
      </Stack>
    </Flex>
  )
}