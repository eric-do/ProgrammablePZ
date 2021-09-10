import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from 'test/test-utils';
import { SuggestionsModal } from 'features/timer/components/SuggestionsModal';
import { AppProvider } from "providers/app";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const defaultProps = {
  isOpen: true,
  onClose: () => {},
  setWorkout: () => {}
}
it('should render default UI', () => {
  render(
  <QueryClientProvider client={queryClient}>
    <SuggestionsModal {...defaultProps} />
  </QueryClientProvider>);

  expect(screen.getByText('All rides')).toBeInTheDocument();
  expect(screen.getByText('All lengths')).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(2);
})