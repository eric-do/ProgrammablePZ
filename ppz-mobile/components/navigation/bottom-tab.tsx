import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Timer } from '../../features/timer';
import { Profile } from '../../features/profile';

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{ title: 'Timer'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile'}}
      />
    </Tab.Navigator>
  )
}