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
import { rides } from 'test/data';


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
  expect(screen.queryAllByTestId('ride-heading').length).toBeGreaterThan(0)
  expect(screen.queryAllByTestId('interval-zone-chart').length).toBeGreaterThan(0)
  expect(screen.queryAllByTestId('ride-rating').length).toBeGreaterThan(0)
  expect(screen.queryAllByTestId('ride-count').length).toBeGreaterThan(0)
})

test('it renders updated list when type selected from dropdown', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  await waitFor(() => screen.getByText(rides[0].title as string))
  expect(screen.queryAllByTestId('ride-description-card')).toHaveLength(rides.length)

  server.use(
    rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
      return res.once(ctx.json(rides.slice(0, 2)))
    }),
  );

  const typeDropdown = screen.getByTestId('type-dropdown') as HTMLSelectElement;
  fireEvent.change(typeDropdown, { target: { value: 'pzm' }});

  await waitFor(() => screen.getByText(rides[0].title as string))
  expect(screen.queryAllByTestId('ride-description-card')).toHaveLength(2)
})

test('it renders updated list when length selected from dropdown', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  await waitFor(() => screen.getByText(rides[0].title as string))
  expect(screen.queryAllByTestId('ride-description-card')).toHaveLength(rides.length)

  server.use(
    rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
      return res.once(ctx.json(rides.slice(0, 2)))
    }),
  );

  const lengthDropdown = screen.getByTestId('length-dropdown') as HTMLSelectElement;
  fireEvent.change(lengthDropdown, { target: { value: '1200' }});

  await waitFor(() => screen.getByText(rides[0].title as string))
  expect(screen.queryAllByTestId('ride-description-card')).toHaveLength(2)
})

test('it renders no results message when no rides match search', async () => {
  server.use(
    rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
      return res.once(ctx.json([]))
    }),
  );

  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  await waitFor(() => screen.getByText('No rides found.'))
  expect(screen.getByText('No rides found.')).toBeInTheDocument();
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
