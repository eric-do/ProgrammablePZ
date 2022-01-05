import React from 'react';
import {
  Text,
  View
} from "native-base";
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Screen } from "../../components/layout/Screen";
import { Profile, Followers, Following } from './screens'
import { AuthNavigationStack } from 'features/auth';

export type ProfileStackParamList = {
  Profile: undefined,
  Followers: undefined,
  Following: undefined,
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
    </Stack.Navigator>
  );
}