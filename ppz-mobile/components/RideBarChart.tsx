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
import { Ride } from '../types';
import { zoneColors } from '../utils/colors';

interface BarChartProps {
  ride: Ride;
}

export const RideBarChart = ({ ride }: BarChartProps) => {
  const totalTimeInSeconds = ride.intervals.reduce((acc: number, interval) => (
    acc + interval.timeInSeconds), 0);

  return (
    <HStack space={0.5} h='100%' alignItems='flex-end'>
      {
        ride.intervals.map((interval, index) => {
          return <Box
            key={index}
            w={`${Math.floor(interval.timeInSeconds / totalTimeInSeconds * 100)}%`}
            h={`${Math.floor(interval.zone / 7 * 100)}%`}
            bgColor={zoneColors[interval.zone]}
          />
        })
      }
    </HStack>
  )
};