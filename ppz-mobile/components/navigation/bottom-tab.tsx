import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Timer } from '../../features/timer';
import { Profile } from '../../features/profile';

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{

      }}
    >
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}