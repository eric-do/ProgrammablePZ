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
      user: user?.username
    }
  })

  return (
    <Stack>
      <Heading size="lg">Recent rides</Heading>
      <Stack direction="column" spacing={4} data-testid="recent-rides">
        {
          rides?.map(ride => <RideCard key={ride.id} ride={ride} onClick={() => {}} />)
        }
        {
          error && <Text>Something went wrong.</Text>
        }
      </Stack>
    </Stack>
  )
};