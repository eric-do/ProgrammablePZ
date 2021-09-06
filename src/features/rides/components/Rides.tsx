import React, { useState } from 'react';
import {
  Box,
  Select,
  Text,
  Stack,
  Heading,
  Flex,
  Spacer
} from "@chakra-ui/react";
import { suggestions as rides } from 'shared/data';
import { ZoneGraph } from 'components';

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
        <Stack
          direction="column"
          spacing={4}
        >
          {
            rides.map((ride, index) => (
              <Box
                key={ride.id || index}
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
      </Stack>
    </Flex>
  )
};