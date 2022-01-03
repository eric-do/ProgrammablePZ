import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Box,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { AppTabs } from "./components/navigation";

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
        <AppTabs />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}