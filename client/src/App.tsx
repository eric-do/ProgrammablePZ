import React from "react";
import {
  Box,
  Grid,
} from "@chakra-ui/react";
import {
  Switch,
  Route
} from "react-router-dom";
import { AppProvider } from "providers/app";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { ZoneTimer } from "features/timer";
import { Rides } from "features/rides";

export const App = () => {
  return (
    <AppProvider>
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
    </AppProvider>
  );
}