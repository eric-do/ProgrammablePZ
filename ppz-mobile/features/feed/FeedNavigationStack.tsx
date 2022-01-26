import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import { RideFeed } from "./screens";
import { RideDiscussion }  from 'features/rides/screens'

export type FeedStackParamList = {
  RideFeed: undefined,
  RideDiscussion: { rideId: number },
};

const Stack = createNativeStackNavigator();

export const FeedNavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="RideFeed"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="RideFeed" component={RideFeed} />
    </Stack.Navigator>
  )
}