import React, { useState } from 'react';
import {
  Select,
  Text,
  Stack,
  Heading,
  Flex,
  Spinner
} from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryOptions } from 'lib/react-query';
import { useRide } from 'providers/RideProvider';
import { Workout } from 'types';
import { useInfiniteRides } from '../api/index';
import { RideCard } from './RideCard';

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