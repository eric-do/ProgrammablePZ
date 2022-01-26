import React, { useState } from 'react';
import {
  Heading,
  VStack,
  Box,
  ScrollView,
  Text,
  Center
} from 'native-base';;
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
    ride.id && navigation.navigate('RideDiscussion', { rideId: ride.id });
  }

  const navigateToDiscussion = (ride: Ride) => {
    setRide(ride)
    ride.id && navigation.navigate('RideDiscussion', { rideId: ride.id });
  }

  return (
    <ScrollView>
    <Box alignItems='center'>
      <VStack w='100%' space={3}>
        {
          rides && rides.map(ride => (
            <RideCard
              ride={ride}
              key={ride.id}
              onPressDiscussion={navigateToDiscussion}
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