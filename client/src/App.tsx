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
import { NavBar } from "components/Navigation";
import { PrivateRoute } from "features/auth/components/PrivateRoute";
import { ZoneTimer } from "features/timer";
import { Rides } from "features/rides";
import { Login, Register } from "features/auth/routes";

export const App = () => {
  return (
    <AppProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <NavBar />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/timer">
              <ZoneTimer />
            </Route>
            <Route exact path="/rides">
              <Rides />
            </Route>
            <PrivateRoute path="/favorites">

            </PrivateRoute>
            <Route exact path="/">
              <ZoneTimer />
            </Route>
          </Switch>
        </Grid>
      </Box>
    </AppProvider>
  );
}