import React from 'react';
import { Box } from "@chakra-ui/react";
import { useAuth } from 'lib/auth';
import { Rides } from 'features/rides';

export const UserRides = () => {
  const { user } = useAuth();

  return (
    <Box>
      { user && <Rides user={user.username} /> }
    </Box>
  )
};