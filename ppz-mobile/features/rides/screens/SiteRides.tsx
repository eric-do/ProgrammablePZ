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
  Box,
  Progress,
  Flex,
  Spacer
} from "native-base";
import { useGetRides } from '../api/';

export const SiteRides = () => {
  const { rides, isPending, error, getMoreRides } = useGetRides();

  return (
    <Text>Site Rides</Text>
  )
};