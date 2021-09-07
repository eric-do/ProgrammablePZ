import React from 'react';
import {
  userEvent,
  render,
  screen,
  fireEvent,
  waitFor
} from 'test/test-utils';
import { API_URL } from 'config';
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query';
import { queryClient } from "lib/react-query";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { Rides } from 'features/rides';
import { suggestions as rides } from 'shared/data';

const server = setupServer(
  rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
    return res(ctx.json(rides))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

xtest('it should render initial UI', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  expect(screen.getByText('All rides')).toBeInTheDocument();
  expect(screen.getByText('All lengths')).toBeInTheDocument();
})

test('it render rides after API request', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Rides />
    </QueryClientProvider>,
    {wrapper: MemoryRouter}
  );

  await waitFor(() => screen.getByText(rides[0].title as string))
  expect(screen.queryAllByTestId('ride-description-card')).toHaveLength(rides.length)
})
