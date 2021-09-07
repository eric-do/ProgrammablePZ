import React from 'react';
import {
  userEvent,
  render,
  screen,
  fireEvent,
  waitFor
} from 'test/test-utils';
import { API_URL } from 'config';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom'
import { rest } from 'msw'
import { server } from 'test/server/server';
import { Rides } from 'features/rides';
import { suggestions as rides } from 'shared/data';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

test('it should render initial UI', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  expect(screen.getByText('All rides')).toBeInTheDocument();
  expect(screen.getByText('All lengths')).toBeInTheDocument();
})

test('it renders appropriate UI based on fetch status', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  expect(screen.getByTestId('spinner')).toBeInTheDocument();
  await waitFor(() => screen.getByText(rides[0].title as string))
  expect(screen.queryAllByTestId('ride-description-card')).toHaveLength(rides.length)
})

xtest('it renders an error message if fetch returned an error', () => {
  server.use(
    rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ message: 'Internal server error' }),
      )
    }),
  );
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );
  expect(screen.getByTestId('error-message')).toBeInTheDocument();
})
