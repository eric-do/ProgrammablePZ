import React from 'react';
import {
  Heading,
  Flex,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { Workout } from 'types';
import { useInfiniteTimeline } from '../api';
import { RideCard } from 'features/rides';
import { useRide } from 'providers/RideProvider';

export const Timeline = () => {
  const history = useHistory();
  const { setRide } = useRide();
  const {
    data,
    fetchNextPage,
    isLoading,
    error
  } = useInfiniteTimeline({
    options: {
      page: 1,
      limit: 10
    }
  });

  const handleSetRide = (ride: Workout) => {
    setRide(ride);
    history.push('/timer')
  }

  return (
    <Stack>
      <Heading size="lg" pb={3}>Ride Feed</Heading>
      { error &&
        <Text data-testid='error-message'>
          Something went wrong. Please reload the page.
        </Text>
      }
      { isLoading &&
        <Flex justify="center" align="center">
          <Spinner data-testid='spinner'/>
        </Flex>
      }
      { data &&
        <InfiniteScroll
          dataLength={data.pages.length}
          next={fetchNextPage}
          hasMore={data.pages[data.pages.length - 1].length > 0}
          loader={<span></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Stack
            direction="column"
            spacing={4}
          >
            {
              data.pages.map((rides, i) => (
                <React.Fragment key={i}>
                  {
                    rides.map((ride, index) => (
                      <RideCard
                        ride={ride}
                        key={ride.id || index}
                        onClick={handleSetRide}
                      />
                    ))
                  }
                </React.Fragment >
              ))
            }
          </Stack>
        </InfiniteScroll>
      }
    </Stack>
  )
};