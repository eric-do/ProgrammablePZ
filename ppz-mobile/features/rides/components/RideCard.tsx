import React from 'react';
import {
  Text,
  Box,
  Heading,
  Pressable,
  Badge,
  VStack,
  Flex
} from "native-base";
import { Ride } from '../../../types';
import { RideBarChart } from '../../../components/RideBarChart';

interface RideCardProps {
  ride: Ride;
  onPress: (r: Ride) => void;
}

export const RideCard = ({ ride, onPress }: RideCardProps ) => {
  const newCutoffDate = new Date();
  const rideDate = ride.createdOn ? new Date(ride.createdOn) : new Date();
  newCutoffDate.setMonth(newCutoffDate.getMonth() - 1);

  return (
    <Pressable onPress={() => onPress(ride)}>
      <Box>
        <Box
          h='80px'
          px='5%'
          py='7px'
          bgColor='darkBlue.800'
          borderTopLeftRadius='5px'
          borderTopRightRadius='5px'
        >
          <VStack>
            <Box h='15%'>
              <Flex
                top={0}
                right={0}
                position='absolute'
              >
                {
                  rideDate > newCutoffDate &&
                  <Badge _text={{ fontSize: 10 }}>
                    NEW RIDE
                  </Badge>
                }
              </Flex>
            </Box>
            <Box h='85%' pt='3%'>
            <RideBarChart ride={ride} />
            </Box>
          </VStack>
        </Box>
        <Box
          py='5px'
          px='5%'
          bgColor='muted.50'
          borderColor='muted.400'
          borderWidth='0.5px'
          borderBottomLeftRadius='5px'
          borderBottomRightRadius='5px'
        >
          <Heading size='xs' alignSelf='center'>{ride.title}</Heading>
          <Text alignSelf='center'>{ride.type}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};