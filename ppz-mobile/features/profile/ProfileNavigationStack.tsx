import React from 'react';
import {
  Text,
  View
} from "native-base";
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Screen } from "../../components/layout/Screen";
import {
  Profile,
  Followers,
  Following,
  SavedRides,
  FindMembers
} from './screens'
import { ZoneInput, RideProgress } from 'features/timer/screens';
import { AuthNavigationStack } from 'features/auth';
import { RideDiscussion } from 'features/rides/screens';

export type ProfileStackParamList = {
  Profile: undefined,
  EditProfile: undefined,
  Followers: undefined,
  Following: undefined,
  FindMembers: undefined,
  SavedRides: undefined,
  ZoneInput: undefined,
  RideProgress: undefined,
  RideDiscussion: { rideId: number },
};

const Stack = createNativeStackNavigator();

export const ProfileNavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Followers' component={Followers} />
      <Stack.Screen name='Following' component={Following} />
      <Stack.Screen name='FindMembers' component={FindMembers} />
      <Stack.Screen name='SavedRides' component={SavedRides} />
      <Stack.Screen name='ZoneInput' component={ZoneInput} />
      <Stack.Screen name='RideProgress' component={RideProgress} />
      <Stack.Screen name='RideDiscussion' component={RideDiscussion} />
    </Stack.Navigator>
  );
}