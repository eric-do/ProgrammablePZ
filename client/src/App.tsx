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
import { Profile } from "features/profile/routes";
import { Rides, UserRides, RecentRides } from "features/rides";
import { Login, Register } from "features/auth/routes";
import { Search } from 'features/profile';
import { Following } from "features/social/routes";

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
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/recent">
              <RecentRides />
            </PrivateRoute>
            <PrivateRoute path="/favorites">
              <UserRides />
            </PrivateRoute>
            <PrivateRoute path="/search">
              <Search />
            </PrivateRoute>
            <PrivateRoute path="/me/following">
              <Following />
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