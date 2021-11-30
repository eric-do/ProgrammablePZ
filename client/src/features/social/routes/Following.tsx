import React from 'react';
import {
  Box,
  Center,
  Heading,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useFriends } from '../api';
import { useAuth } from 'lib/auth';
import { UserList } from 'features/profile/components';
import { Page } from 'components';

export const Following = () => {
  const { user } = useAuth();

  const { data, error, isLoading } = useFriends({ user_id: user?.id })

  return (
    <Page title="Friends">
      <Heading size="lg" pb={3} >Friends</Heading>
      { isLoading && <Center><Spinner /></Center> }
      { error && <Text>Something went wrong.</Text> }
      { data &&
         <Box w="100%">
          <UserList users={data.friends} />
        </Box>
      }
    </Page>
  )
}