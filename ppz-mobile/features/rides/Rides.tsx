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
import { SiteRides, SocialRides } from "./screens";

export type TimerStackParamList = {
  SiteRides: undefined;
  SocialRides: undefined
};

const Stack = createNativeStackNavigator();

export const Rides = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SiteRides" component={SiteRides} />
        <Stack.Screen name="SocialRides" component={SocialRides} />
      </Stack.Navigator>
  )
}