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
import { ErrorBoundary } from 'react-error-boundary';
import { QueryOptions } from 'lib/react-query';
import { ZoneGraph } from 'components';
import { useRides } from '../api/index';

const defaultFilter =  {
  type: 'all',
  timeInSeconds:'all'
}

export const Rides = () => {
  const [filters, setFilters] = useState<QueryOptions>(defaultFilter);
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

const RideList = ({options}: RideListProps) => {
  const { data: rides, isLoading, error } = useRides({ options });

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
                    {ride.ratings?.likes || 0} 👍
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
      { rides?.length === 0 &&
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