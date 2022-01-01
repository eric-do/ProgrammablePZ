import React, { useState } from "react";
import {
  Text,
  Button,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Slider,
  VStack,
  Code,
  View,
  Modal,
  Box,
  Progress,
  Flex,
  Spacer
} from "native-base";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTimer } from '../../../hooks';
import { useStore } from "../../../store";
import { RideBarChart } from '../../../components/RideBarChart';
import { Interval } from '../../../types';
import { Screen } from '../../../components/layout/Screen'
import { zoneColorSchemes } from '../../../utils/colors'

type TimerStackParamList = {
  ZoneInput: undefined;
  RideProgress: undefined
};

type Props = NativeStackScreenProps<TimerStackParamList, 'ZoneInput'>;

export const RideProgress = ({ navigation }: Props) => {
  const ride = useStore(state => state.ride);
  const elapsedTime = useTimer(ride.timeInSeconds);
  const { currentInterval, currentZoneTime } = getCurrentInterval(ride.intervals, elapsedTime);
  const percentageRideComplete = elapsedTime / ride.timeInSeconds * 100;
  const percentageZoneComplete = currentZoneTime / ride.intervals[currentInterval].timeInSeconds * 100;
  const currentZone = ride.intervals[currentInterval].zone;

  return (
    <Screen title={`Zone ${currentZone}`}>
      <VStack h='60%' space={4} justifyContent={'center'}>
      <Spacer />
        <Heading alignSelf='center' size='md'>Ride Progress</Heading>
        <Box h={100} px='5%'>
          <RideBarChart ride={ride} currentInterval={currentInterval} />
        </Box>
        <Progress
          value={percentageRideComplete}
          colorScheme={'green'}
          mx="4"
        />
        <Spacer />
        <Heading alignSelf='center' size='md'>Zone Progress</Heading>
        <Progress
          value={percentageZoneComplete}
          colorScheme={zoneColorSchemes[ride.intervals[currentInterval].zone]}
          mx="4"
        />
      </VStack>
    </Screen>
  );
};

const getCurrentInterval = (intervals: Interval[], elapsedTime: number) => {
  let currentInterval = 0;
  let sum = 0;
  let i = 0;

  while (intervals[i].timeInSeconds + sum < elapsedTime && i < intervals.length) {
    currentInterval += 1;
    sum += intervals[i].timeInSeconds;
    i += 1
  }

  const currentZoneTime = elapsedTime - sum;

  return { currentInterval, currentZoneTime }
}