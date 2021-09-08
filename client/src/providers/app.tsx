import React from "react";
import {ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { queryClient } from "lib/react-query";
import theme from 'theme';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          { children }
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}