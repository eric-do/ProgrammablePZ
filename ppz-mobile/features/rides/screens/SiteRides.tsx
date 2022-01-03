import React from 'react';
import {
  Heading,
  VStack,
  Box,
  ScrollView,
  Center,
  Text
} from "native-base";
import { useGetRides } from '../api/';
import { RideCard } from '../components/RideCard';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { useStore } from '../../../store';
import { Ride } from '../../../types';

type RidesStackParamList = {
  SiteRides: undefined;
  SocialRides: undefined;
  ZoneInput: undefined;
  RideProgress: undefined
};

type Props = NativeStackScreenProps<RidesStackParamList, 'SiteRides'>;

export const SiteRides = ({ navigation }: Props) => {
  const { rides, isPending, error } = useGetRides();
  const setRide = useStore(state => state.setRide);

  const navigateToTimer = (ride: Ride) => {
    setRide(ride)
    navigation.navigate('ZoneInput');
  }

  return (
    <Box safeArea>
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
              error &&
                <Center mt='50%'>
                  <Text>There was a problem getting rides. Try again later.</Text>
                </Center>
            }
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  )
};