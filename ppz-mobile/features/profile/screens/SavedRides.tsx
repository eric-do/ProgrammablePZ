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

type Props = NativeStackScreenProps<ProfileStackParamList, 'SavedRides'>;

export const SavedRides = ({ navigation }: Props) => {
  return (
    <Text>Saved Rides</Text>
  );
};