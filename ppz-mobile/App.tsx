import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { AppTabs, AppNavigation } from "./components/navigation";
import { AuthenticationProvider } from "features/auth/AuthenticationProvider";
import { QueryProvider } from "providers/QueryClientProvider";

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
      <QueryProvider>
        <NativeBaseProvider>
          <AuthenticationProvider>
            <AppNavigation />
          </AuthenticationProvider>
        </NativeBaseProvider>
      </QueryProvider>
    </NavigationContainer>
  );
}