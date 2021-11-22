import React from 'react';
import {
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  Link
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

export const Profile = () => {
  return (
    <Stack
      align='center'
    >
      <Heading size="lg" pb={3}>Profile</Heading>
      <Flex
        width={{
          base: "100%",
          md: "30%",
        }}
      >
        <Link
          as={RouterLink}
          to='/following'
        >
          <Text>Following</Text>
        </Link>
        <Spacer />
        <Link
          as={RouterLink}
          to='/followers'
        >
          <Text>Followers</Text>
        </Link>
        <Spacer />
        <Link
          as={RouterLink}
          to='/search'
        >
          <Text>Find members</Text>
        </Link>
      </Flex>
    </Stack>
  )
};