import React from "react";
import {
  ChakraProvider,
  Box,
  Grid,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { ZoneTimer } from "features/timer";
import theme from 'theme';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <ZoneTimer />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}