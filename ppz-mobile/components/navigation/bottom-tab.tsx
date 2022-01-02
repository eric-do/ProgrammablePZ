import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Timer } from '../../features/timer';
import { Profile } from '../../features/profile';
import { Rides } from '../../features/rides';

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Timer"
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
        name="Rides"
        component={Rides}
        options={{ title: 'Rides'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile'}}
      />
    </Tab.Navigator>
  )
}