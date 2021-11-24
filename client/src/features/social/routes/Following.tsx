import React from 'react';
import {
  Center,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useFriends } from '../api';
import { useAuth } from 'lib/auth';
import { UserList } from 'features/profile/components';

export const Following = () => {
  const { user } = useAuth();

  const { data, error, isLoading } = useFriends({ user_id: user?.id })
  return (
    <>
      { isLoading && <Center><Spinner /></Center> }
      { error && <Text>Something went wrong.</Text> }
      { data && <UserList users={data.friends} />  }
    </>
  )
}