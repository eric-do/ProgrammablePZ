import React from 'react';
import {
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { useAuth } from 'lib/auth';
import { useUserRides } from '../api';
import { RideCard } from 'features/rides';

export const Profile = () => {
  const { user } = useAuth();
  const { data: rides, error } = useUserRides({
    options: {
      userId: user?.id
    }
  })

  return (
    <Stack>
      <Heading size="lg" pb={3}>Recent rides</Heading>
      <Stack direction="column" spacing={4} data-testid="recent-rides">
        {
          rides?.map((ride, idx) => <RideCard key={idx} ride={ride} onClick={() => {}} />)
        }
        {
          error && <Text>Something went wrong.</Text>
        }
      </Stack>
    </Stack>
  )
};