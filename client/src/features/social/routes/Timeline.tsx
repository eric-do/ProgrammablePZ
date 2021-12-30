import React from 'react';
import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import { useStore } from 'store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { Workout } from 'types';
import { Page } from 'components';
import { useInfiniteTimeline } from '../api';
import { RideCard } from 'features/rides';

export const Timeline = () => {
  const history = useHistory();
  const setRide = useStore(state => state.setRide);
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
    <Page title="Ride Feed">
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
        <Box w="100%">
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
        </Box>
      }
    </Page>
  )
};