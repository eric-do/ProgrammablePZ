import React from "react";
import {
  Center,
  extendTheme,
  VStack,
  Box,
  Heading
} from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

interface ScreenProps extends React.PropsWithChildren<any> {
  title?: String
}
// extend the theme
export const theme = extendTheme({ config });

export const Screen = ({ children, title }: ScreenProps) => {
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <VStack w='100%' space={5} alignItems="center">
        <Heading alignSelf='center'>{title}</Heading>
        { children }
      </VStack>
    </Center>
  );
}