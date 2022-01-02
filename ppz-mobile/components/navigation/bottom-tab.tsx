import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Timer } from '../../features/timer';
import { ProfileNavigationStack } from '../../features/profile';
import { AuthNavigationStack } from 'features/auth';
import { Rides } from '../../features/rides';
import { useStore } from 'store';


const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  const auth = useStore(state => state.auth);

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
      {
        auth ?
        <Tab.Screen
          name="Profile"
          component={ProfileNavigationStack}
          options={{ title: 'Profile'}}
        /> :
        <Tab.Screen
          name="Authentication"
          component={AuthNavigationStack}
          options={{ title: 'Login'}}
        />
      }
    </Tab.Navigator>
  )
}