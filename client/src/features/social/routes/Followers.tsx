import React from 'react';
import {
  Box,
  Center,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useGetFollowers } from '../api';
import { useAuth } from 'lib/auth';
import { UserList } from 'features/profile/components';
import { Page } from 'components'

export const Followers = () => {
  const { user } = useAuth();

  const { data, error, isLoading } = useGetFollowers({ user_id: user?.id })

  return (
    <Page title="Followers">
      { isLoading && <Center><Spinner /></Center> }
      { error && <Text>Something went wrong.</Text> }
      { data &&
        <Box w="100%">
          <UserList users={data.followers} />
        </Box>
      }
    </Page>
  )
}