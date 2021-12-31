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
  Progress
} from "native-base";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTimer } from '../../../hooks';
import { useStore } from "../../../store";
import { RideBarChart } from '../../../components/RideBarChart';

type TimerStackParamList = {
  ZoneInput: undefined;
  RideProgress: undefined
};

type Props = NativeStackScreenProps<TimerStackParamList, 'ZoneInput'>;

export const RideProgress = ({ navigation }: Props) => {
  const ride = useStore(state => state.ride);
  const elapsedTime = useTimer(ride.timeInSeconds);
  const percentageComplete = elapsedTime / ride.timeInSeconds * 100;
  let currentInterval = 0;
  let sum = 0;
  for (const interval of ride.intervals) {
    if (interval.timeInSeconds + sum < elapsedTime) {
      currentInterval += 1;
      sum += interval.timeInSeconds;
    } else {
      break;
    }
  }

  return (
    <>
      <Text>Progress</Text>
      <Text>{elapsedTime}</Text>
      <VStack space={4}>
        <Box h={100} px='5%'>
          <RideBarChart ride={ride} currentInterval={currentInterval} />
        </Box>
        <Progress value={percentageComplete} mx="4" />
      </VStack>
    </>
  );
};