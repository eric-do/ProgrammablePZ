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
import { RideList } from 'features/rides/components'

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
          pb={10}
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
                <Text fontSize="md">{ data.friend_count }</Text>
                <Text fontSize="md">Following</Text>
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
              <Text fontSize="md">{ data.follower_count }</Text>
              <Text fontSize="md">Followers</Text>
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
              <Text fontSize="md">
                <Icon as={FaSearch} w={4} h={4}/>
              </Text>
              <Text fontSize="md">
                Find members
              </Text>
            </LinkOverlay>
            </LinkBox>
          </Stack>
        </Flex>
       }
       <Heading size="md">Created rides</Heading>
       <Stack w={{base: '100%', lg: '60%'}} >
       <RideList options={{ user: user?.username}}/>
       </Stack>
    </Stack>
  )
};