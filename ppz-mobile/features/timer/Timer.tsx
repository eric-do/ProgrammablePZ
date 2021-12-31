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
  Box
} from "native-base";
import { createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import { ZoneInput, RideProgress } from './screens'

export type TimerStackParamList = {
  ZoneInput: undefined;
  RideProgress: undefined
};

const Stack = createNativeStackNavigator();

export const Timer = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="ZoneInput" component={ZoneInput} />
        <Stack.Screen name="RideProgress" component={RideProgress} />
      </Stack.Navigator>
  )
}