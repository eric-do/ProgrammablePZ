import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen, within } from 'test/test-utils';
import { FinishRideModal } from 'features/timer/components/FinishRideModal';
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
}
it('should render default UI', () => {
  const mockCloseFn = jest.fn();

  render(
  <QueryClientProvider client={queryClient}>
    <FinishRideModal {...defaultProps} onClose={mockCloseFn} />
  </QueryClientProvider>);

  expect(screen.getByRole('heading', { name: 'Thanks for your feedback!' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Difficulty' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Rating' })).toBeInTheDocument();
  expect(screen.getByTestId('ratings-buttons')).toBeInTheDocument();
  expect(within(screen.getByTestId('ratings-buttons')).queryAllByRole('button')).toHaveLength(5)
  expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  expect(mockCloseFn).toHaveBeenCalled();
})