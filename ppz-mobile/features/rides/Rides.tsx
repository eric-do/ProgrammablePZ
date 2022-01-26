import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import { SiteRides, SocialRides, RideDiscussion } from "./screens";
import { ZoneInput, RideProgress } from "../timer/screens";

export type TimerStackParamList = {
  SiteRides: undefined,
  SocialRides: undefined,
  ZoneInput: undefined,
  RideProgress: undefined,
  RideDiscussion: { rideId: number },
};

const Stack = createNativeStackNavigator();

export const Rides = () => {
  return (
      <Stack.Navigator
        initialRouteName="SiteRides"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SiteRides" component={SiteRides} />
        <Stack.Screen name="SocialRides" component={SocialRides} />
        <Stack.Screen name="ZoneInput" component={ZoneInput} />
        <Stack.Screen name="RideProgress" component={RideProgress} />
        <Stack.Screen name="RideDiscussion" component={RideDiscussion} />
      </Stack.Navigator>
  )
}