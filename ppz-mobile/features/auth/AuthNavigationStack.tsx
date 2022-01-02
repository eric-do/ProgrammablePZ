import { createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import { Login, Register } from './screens';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator();

export const AuthNavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}