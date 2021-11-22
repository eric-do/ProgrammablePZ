import React from 'react';
import {
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Spacer,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useGetMetadata } from 'features/social/api';
import { useAuth } from 'lib/auth';

export const Profile = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetMetadata({ user_id: user?.id })

  return (
    <Stack
      align='center'
    >
      <Heading size="lg" pb={3}>Profile</Heading>
      { isLoading && <Spinner /> }
      { data &&
        <Flex
          width={{
            base: "100%",
            md: "30%",
          }}
        >
          <Stack justify='center'>
            <LinkBox>
              <LinkOverlay
                as={RouterLink}
                to='/following'
              >
                <Text>{ data.friend_count }</Text>
                <Text>Following</Text>
              </LinkOverlay>
            </LinkBox>
          </Stack>
          <Spacer />
          <Stack justify='center'>
          <LinkBox>
            <LinkOverlay
              as={RouterLink}
              to='/followers'
            >
              <Text>{ data.follower_count }</Text>
              <Text>Followers</Text>
            </LinkOverlay>
          </LinkBox>
          </Stack>
          <Spacer />
          <Stack justify='center'>
            <LinkBox>
            <LinkOverlay
              as={RouterLink}
              to='/search'
            >
              <Text>
                <Icon as={FaSearch} w={5} h={5}/>
              </Text>
              <Text>
                Find members
              </Text>
            </LinkOverlay>
            </LinkBox>
          </Stack>
        </Flex>
       }
    </Stack>
  )
};