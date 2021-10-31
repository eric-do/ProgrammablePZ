import React from 'react';
import {
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { useAuth } from 'lib/auth';
import { Workout } from 'types';
import { useUserRides } from '../api';
import { RideCard } from 'features/rides';
import { useRide } from 'providers/RideProvider';

export const Profile = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { setRide } = useRide();
  const { data: rides, error } = useUserRides({
    options: {
      userId: user?.id
    }
  })

  const handleSetRide = (ride: Workout) => {
    setRide(ride);
    history.push('/timer')
  }

  return (
    <Stack>
      <Heading size="lg" pb={3}>Recent rides</Heading>
      <Stack direction="column" spacing={4} data-testid="recent-rides">
        {
          rides?.map((ride, idx) => (
            <RideCard
              key={idx}
              ride={ride}
              onClick={handleSetRide}
            />
          ))
        }
        {
          error && <Text>Something went wrong.</Text>
        }
      </Stack>
    </Stack>
  )
};