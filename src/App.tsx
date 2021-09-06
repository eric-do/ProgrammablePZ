import React from "react";
import {
  ChakraProvider,
  Box,
  Grid,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { ZoneTimer } from "features/timer";
import { Rides } from "features/rides";
import theme from 'theme';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Switch>
              <Route exact path="/timer">
                <ZoneTimer />
              </Route>
              <Route exact path="/rides">
                <Rides />
              </Route>
              <Route exact path="/">
                <ZoneTimer />
              </Route>
            </Switch>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}