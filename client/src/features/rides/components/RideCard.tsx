import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text
} from '@chakra-ui/react'
import { Workout } from "types"
import { ZoneGraph } from 'components'

interface RideProps {
  ride: Workout;
  onClick: (ride: Workout) => void;
}

export const RideCard = ({ ride, onClick }: RideProps) => {
  return (
    <Box
      mb={4}
      onClick={() => onClick(ride)}
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
  )
}