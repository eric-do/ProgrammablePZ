import React, { useMemo } from "react";
import {
  Heading,
  VStack,
  Box,
  Progress,
  Text,
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
  const { elapsedTime, minutes: minutesLeftInRide, seconds } = useTimer(ride.timeInSeconds);
  const { currentInterval, currentZoneTime } = getCurrentInterval(ride.intervals, elapsedTime);
  const percentageRideComplete = elapsedTime / ride.timeInSeconds * 100;
  const percentageZoneComplete = currentZoneTime / ride.intervals[currentInterval].length * 100;
  const currentZone = ride.intervals[currentInterval].zone;
  const secondsLeftInMinute = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const minutesLeftInZone = Math.floor((ride.intervals[currentInterval].length - currentZoneTime) / 60);
  return (
    <Screen>
      <VStack h='60%' space={4} justifyContent={'center'}>
      <Spacer />
      <Heading alignSelf='center' size='md'>Zone Progress</Heading>
      <Heading alignSelf='center' size='sm'>{`Zone ${currentZone}`}</Heading>
      <Text alignSelf='center'>{minutesLeftInZone}:{secondsLeftInMinute}</Text>
      <Progress
        value={percentageZoneComplete}
        colorScheme={zoneColorSchemes[ride.intervals[currentInterval].zone]}
        mx="4"
      />
      <Spacer />
        <Heading alignSelf='center' size='md'>Ride Progress</Heading>
        <Text alignSelf='center'>{minutesLeftInRide}:{secondsLeftInMinute}</Text>
        <Box h='30%' px='5%'>
          <RideBarChart ride={ride} currentInterval={currentInterval} />
        </Box>
        <Progress
          value={percentageRideComplete}
          colorScheme={'green'}
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

  while (intervals[i].length + sum < elapsedTime && i < intervals.length) {
    currentInterval += 1;
    sum += intervals[i].length;
    i += 1
  }

  const currentZoneTime = elapsedTime - sum;

  return { currentInterval, currentZoneTime }
}