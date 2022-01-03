import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Timer } from '../../features/timer';
import { ProfileNavigationStack } from '../../features/profile';
import { AuthNavigationStack } from 'features/auth';
import { FeedNavigationStack } from 'features/feed'
import { Rides } from '../../features/rides';
import { useStore } from 'store';import { Icon } from 'native-base';

type Icon = keyof typeof Ionicons.glyphMap;
type RouteIconDictionary = {
  [k: string]: Icon
}

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  const auth = useStore(state => state.auth);

  return (
    <Tab.Navigator
      initialRouteName="Timer"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {

          const icons: RouteIconDictionary = {
            Timer: focused ? 'timer' : 'timer-outline',
            Rides: focused ? 'bicycle' : 'bicycle-outline',
            ProfileNavigationStack: focused ? 'person-circle' : 'person-circle-outline',
            FeedNavigationStack: focused ? 'md-people-sharp' : 'md-people-outline',
            AuthNavigationStack: focused ? 'log-in-sharp' : 'log-out-outline'
          }

          return <Ionicons name={icons[route.name]} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
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
      { auth &&
        <Tab.Screen
          name="FeedNavigationStack"
          component={FeedNavigationStack}
          options={{ title: 'Ride Feed' }}
        />
      }
      {
        auth ?
        <Tab.Screen
          name="ProfileNavigationStack"
          component={ProfileNavigationStack}
          options={{ title: 'Profile'}}
        /> :
        <Tab.Screen
          name="AuthNavigationStack"
          component={AuthNavigationStack}
          options={{ title: 'Login'}}
        />
      }
    </Tab.Navigator>
  )
}