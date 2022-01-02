import React from 'react';
import {
  Text,
  View
} from "native-base";
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Screen } from "../../components/layout/Screen";
import { Profile } from './screens'
import { AuthNavigationStack } from 'features/auth';

const Stack = createNativeStackNavigator();

export const ProfileNavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Authentication' component={AuthNavigationStack} />
    </Stack.Navigator>
  );
}