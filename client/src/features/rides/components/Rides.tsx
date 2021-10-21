import React, { useState } from 'react';
import {
  Box,
  Select,
  Text,
  Stack,
  Heading,
  Flex,
  Spacer,
  Spinner
} from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryOptions } from 'lib/react-query';
import { useRide } from 'providers/RideProvider';
import { Workout } from 'types';
import { ZoneGraph } from 'components';
import { useInfiniteRides } from '../api/index';

const defaultFilter =  {
  type: 'all',
  timeInSeconds:'all'
}

interface RidesProps {
  user?: string;
}

export const Rides = ({ user }: RidesProps) => {
  const [filters, setFilters] = useState<QueryOptions>({ ...defaultFilter, user });
  const { type, timeInSeconds } = filters;

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setFilters({
      ...filters,
      [name]: value
    })
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
    >
      <Stack
        spacing={3}
        justifyContent="center"
        w={{base: '100%', lg: '60%'}}
      >
      <Heading as="h1" size="lg">Power Zone Rides</Heading>
        <Select
          value={type}
          name="type"
          onChange={handleFilter}
          data-testid="type-dropdown"
        >
          <option value="all">All rides</option>
          <option value="pz">Power Zone</option>
          <option value="pze">Power Zone Enudurance</option>
          <option value="pzm">Power Zone Max</option>
        </Select>
        <Select
          value={timeInSeconds}
          name="timeInSeconds"
          onChange={handleFilter}
          data-testid="length-dropdown"
        >
          <option value="all">All lengths</option>
          <option value="1200">20 minutes</option>
          <option value="1800">30 minutes</option>
          <option value="2700">45 minutes</option>
          <option value="3600">60 minutes</option>
        </Select>
        <ErrorBoundary FallbackComponent={Fallback}>
        <RideList options={filters}/>
        </ErrorBoundary>
      </Stack>
    </Flex>
  )
};

interface RideListProps {
  options: QueryOptions
}

export const RideList = ({options}: RideListProps) => {
  const {
    data,
    fetchNextPage,
    isLoading,
    error
  } = useInfiniteRides({
    options: {
      ...options,
      page: 1,
      limit: 10
    }
  });
  const history = useHistory();
  const { setRide } = useRide();

  const handleSetRide = (ride: Workout) => {
    setRide(ride);
    history.push('/timer')
  }

  return (
    <>
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
            loader={<h4>Loading...</h4>}
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
                        <Box
                          mb={4}
                          onClick={() => handleSetRide(ride)}
                          key={ride.id || index}
                          data-testid="ride-description-card"
                          cursor="pointer"
                          borderBottom="1px"
                          borderBottomColor="dimgray"
                        >
                          <Heading
                            data-testid="ride-heading"
                            fontSize={{base: 'sm', lg: 'md'}}
                          >
                            {ride.title}
                          </Heading>
                          <ZoneGraph
                            intervals={ride.intervals}
                            timeInSeconds={ride.timeInSeconds}
                          />
                          <Flex direction="row">
                            <Flex direction="row" w="30%">
                              <Text data-testid="ride-rating" fontSize={'sm'} >
                                {`Rating: ${ride.ratings?.rating || 5.0} / 5`}
                              </Text>
                            </Flex>
                            <Spacer />
                            <Text
                              data-testid="ride-length"
                              fontSize={'sm'}
                              w="30%"
                            >
                              {`${Math.floor(ride.timeInSeconds / 60)} minutes`}
                            </Text>
                            <Spacer />
                            <Flex direction="row" w="30%" justifyContent="end">
                              <Text
                                data-testid="ride-count"
                                fontSize={'sm'}
                              >
                                {ride.metadata?.rideCount || 0} 🚴
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                      ))
                    }
                  </React.Fragment >
                ))
              }
            </Stack>
          </InfiniteScroll>

      }
      { data?.pages[0].length === 0 &&
        <Text>
          No rides found.
        </Text>
      }
    </>
  )
}

const Fallback = () => (
  <Text>Oops! Something went wrong.</Text>
)