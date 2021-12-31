import React from 'react';
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
  Box
} from "native-base";
import { Ride, Interval } from '../types';
import { zoneColors, inactiveZoneColors } from '../utils/colors';

interface BarChartProps {
  ride: Ride;
  currentInterval?: number;
}

export const RideBarChart = ({ ride, currentInterval }: BarChartProps) => {
  console.log(currentInterval)
  const totalTimeInSeconds = ride.intervals.reduce((acc: number, interval) => (
    acc + interval.timeInSeconds), 0);

  const getBarColor = (interval: number) => {
    if (currentInterval !== undefined) {
      const color = interval <= currentInterval
      ? zoneColors[ride.intervals[interval].zone]
      : inactiveZoneColors[ride.intervals[interval].zone];
      return interval <= currentInterval
        ? zoneColors[ride.intervals[interval].zone]
        : inactiveZoneColors[ride.intervals[interval].zone]
    } else {
      return zoneColors[ride.intervals[interval].zone]
    }
  }

  return (
    <HStack space={0.5} h='100%' alignItems='flex-end'>
      {
        ride.intervals.map((interval, index) => {
          return <Box
            key={index}
            w={`${Math.floor(interval.timeInSeconds / totalTimeInSeconds * 100)}%`}
            h={`${Math.floor(interval.zone / 7 * 100)}%`}
            bgColor={getBarColor(index)}
          />
        })
      }
    </HStack>
  )
};