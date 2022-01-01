import React from 'react';
import {
  Text,
  Box,
  Heading,
  Pressable
} from "native-base";
import { Ride } from '../../../types';
import { RideBarChart } from '../../../components/RideBarChart';

interface RideCardProps {
  ride: Ride;
  onPress: (r: Ride) => void;
}

export const RideCard = ({ ride, onPress }: RideCardProps ) => {
  return (
    <Pressable onPress={() => onPress(ride)}>
      <Box>
        <Box
          h={70}
          px='5%'
          py='7px'
          bgColor='darkBlue.800'
          borderTopLeftRadius='5px'
          borderTopRightRadius='5px'
        >
          <RideBarChart ride={ride} />
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