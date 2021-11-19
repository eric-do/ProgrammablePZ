import React from 'react';
import {
  Heading,
  Stack,
  Text,
  Link
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

export const Profile = () => {
  return (
    <Stack>
      <Heading size="lg" pb={3}>Profile</Heading>
      <Link
        as={RouterLink}
        to='/following'
      >
        <Text>Following</Text>
      </Link>
      <Link
        as={RouterLink}
        to='/followers'
      >
        <Text>Followers</Text>
      </Link>
      <Link
        as={RouterLink}
        to='/search'
      >
        <Text>Find members</Text>
      </Link>
    </Stack>
  )
};