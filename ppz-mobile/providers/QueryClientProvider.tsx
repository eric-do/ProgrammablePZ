import React from 'react';
import { QueryClientProvider } from "react-query";
import { queryClient } from "lib/react-query";

export const QueryProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    { children }
  </QueryClientProvider>
)