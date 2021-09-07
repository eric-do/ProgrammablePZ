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
import { Link } from 'react-router-dom';
// import { suggestions as rides } from 'shared/data';
import { ErrorBoundary } from 'react-error-boundary';
import { Workout as Ride } from 'types';
import { ZoneGraph } from 'components';
import { useRides } from '../api/index';

interface Filter {[k: string]: string};

const defaultFilter =  {
  type: 'all',
  length:'all'
}

export const Rides = () => {
  const [filters, setFilters] = useState<Filter>(defaultFilter);
  const { type, length } = filters;

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
        >
          <option value="all">All rides</option>
          <option value="pz">Power Zone</option>
          <option value="pze">Power Zone Enudurance</option>
          <option value="pzm">Power Zone Max</option>
        </Select>
        <Select
          value={length}
          name="length"
          onChange={handleFilter}
        >
          <option value="all">All lengths</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
        </Select>
        <ErrorBoundary FallbackComponent={Fallback}>
        <RideList />
        </ErrorBoundary>
      </Stack>
    </Flex>
  )
};

const RideList = () => {
  const { data: rides, isLoading, error } = useRides();

  return (
    <>
    { error &&
      <Text data-testid='error-message'>
        Something went wrong. Please reload the page.
      </Text>
    }
    { isLoading && <Spinner data-testid='spinner'/> }
    { rides &&
      <Stack
        direction="column"
        spacing={4}
      >
        {
          rides.map((ride, index) => (
            <Box
              as={Link}
              to={{
                pathname: '/timer',
                state: ride
              }}
              key={ride.id || index}
              data-testid="ride-description-card"
            >
              <Text fontSize={{base: 'md', lg: 'lg'}}>
                {ride.title}
              </Text>
              <ZoneGraph
                intervals={ride.intervals}
                timeInSeconds={ride.timeInSeconds}
              />
              <Flex direction="row">
                <Text fontSize={'sm'}>
                  {ride.ratings?.up || 0} 👍
                </Text>
                <Spacer />
                <Text fontSize={'sm'}>
                  {ride.metadata?.rideCount || 0} 🚴
                </Text>
              </Flex>
            </Box>
          ))
        }
      </Stack>
    }
    </>
  )
}

const Fallback = () => (
  <Text>Oops! Something went wrong.</Text>
)