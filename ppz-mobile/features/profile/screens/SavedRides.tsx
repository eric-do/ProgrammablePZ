import React, { useState } from 'react';
import {
  Heading,
  VStack,
  Box,
  ScrollView,
  Text,
  Center,
  FlatList
} from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ride } from 'types';
import { useStore } from 'store';
import { ProfileStackParamList } from '../';
import { RideCard } from 'features/rides/components/RideCard';
import { useGetSavedRides } from '../api/useGetSavedRides';
import { SiteRides } from 'features/rides/screens';

type Props = NativeStackScreenProps<ProfileStackParamList, 'SavedRides'>;

export const SavedRides = ({ navigation }: Props) => {
  const auth = useStore(state => state.auth);
  const setRide = useStore(state => state.setRide);
  const { rides, fetchNextPage, isFetching, error } = useGetSavedRides(auth);

  rides && console.log(rides);

  const navigateToTimer = (ride: Ride) => {
    setRide(ride);
    navigation.navigate('ZoneInput');
  }

  return (
    <Box mt='10px'>
      <Box alignItems='center' bgColor='gray.200'>
        <VStack w='100%' space={5}>
          <FlatList
            data={rides}
            renderItem={({ item, index }) => (
              <RideCard
                ride={item}
                key={item.id}
                onPress={ride => navigateToTimer(ride)}
              />
            )}
            onEndReached={() => fetchNextPage()}
            ItemSeparatorComponent={() => <Box h='10px' />}
          >
          </FlatList>
          {
            error &&
              <Center mt='50%'>
                <Text>There was a problem getting rides. Try again later.</Text>
              </Center>
            }
        </VStack>
      </Box>

    </Box>
  );
};