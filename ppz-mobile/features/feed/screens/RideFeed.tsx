import React, { useState } from 'react';
import {
  Heading,
  VStack,
  Box,
  ScrollView,
  Text,
  Center
} from "native-base";;
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { Ride } from 'types';
import { useStore } from 'store';
import { FeedStackParamList } from '../';
import { useGetTimeline } from '../api/getRideFeed';
import { RideCard } from 'features/rides/components/RideCard';

type Props = NativeStackScreenProps<FeedStackParamList, 'RideFeed'>;

export const RideFeed = ({ navigation }: Props) => {
  const { rides, error, incrementPage } = useGetTimeline();
  const setRide = useStore(state => state.setRide);

  const navigateToTimer = (ride: Ride) => {
    setRide(ride)
    // navigation.navigate('ZoneInput');
  }

  return (
    <ScrollView>
    <Box alignItems='center'>
      <VStack w='90%' space={3}>
        <Heading alignSelf='center' mb='5px' mt={10}>Rides</Heading>
        {
          rides && rides.map((ride, index) => (
            <RideCard
              ride={ride}
              key={ride.id}
              onPress={ride => navigateToTimer(ride)}
            />
          ))
        }
        {
          rides.length === 0 &&
          <Center mt='80%'>
            <Text>There are no rides on your feed. Try adding some friends!</Text>
          </Center>
        }
        {
          error &&
          <Center mt='80%'>
            <Text>There was a problem getting your feed. Try again later.</Text>
          </Center>
        }
      </VStack>
    </Box>
    </ScrollView>
  )
};