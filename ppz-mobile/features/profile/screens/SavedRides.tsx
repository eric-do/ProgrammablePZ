import React, { useState } from 'react';
import {
  Heading,
  VStack,
  Box,
  ScrollView,
  Text,
  Center
} from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ride } from 'types';
import { useStore } from 'store';
import { ProfileStackParamList } from '../';
import { RideCard } from 'features/rides/components/RideCard';
import { useGetSavedRides } from '../api/useGetSavedRides';

type Props = NativeStackScreenProps<ProfileStackParamList, 'SavedRides'>;

export const SavedRides = ({ navigation }: Props) => {
  const auth = useStore(state => state.auth);
  const { rides, fetchNextPage, isFetching, error } = useGetSavedRides(auth);

  rides && console.log(rides);

  return (
    <Text>Saved Rides</Text>
  );
};