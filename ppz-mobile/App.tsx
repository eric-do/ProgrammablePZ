import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { AppTabs } from "./components/navigation";
import { AuthenticationProvider } from "features/auth/AuthenticationProvider";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthenticationProvider>
          <AppTabs />
        </AuthenticationProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}