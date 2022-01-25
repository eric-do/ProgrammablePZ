import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Text
} from 'native-base';
import { TimerStackParamList } from '../';

type Props = NativeStackScreenProps<TimerStackParamList, 'RideDiscussion'>;

export const RideDiscussion = ({ route }: Props) => {
  const { rideId } = route.params;

  return (
    <Box>
      <Text>Ride: {rideId}</Text>
    </Box>
  );
};