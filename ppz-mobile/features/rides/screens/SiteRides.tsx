import React from 'react';
import {
  Heading,
  FlatList,
  VStack,
  Box,
  ScrollView,
  Center,
  Text
} from "native-base";
import { useGetRides, useInfiniteRides } from '../api/';
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
  const setRide = useStore(state => state.setRide);
  const { rides, isFetching, error, fetchNextPage } = useInfiniteRides();

  const navigateToTimer = (ride: Ride) => {
    setRide(ride)
    navigation.navigate('ZoneInput');
  }

  return (
    <Box mt='10px'>
      {/* <ScrollView> */}
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
              ItemSeparatorComponent={
                () => <Box h='10px'/>
              }
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
      {/* </ScrollView> */}
    </Box>
  )
};