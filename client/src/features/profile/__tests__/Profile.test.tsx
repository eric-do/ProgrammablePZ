import React from 'react';
import {
  userEvent,
  render,
  screen,
  fireEvent,
  waitFor
} from 'test/test-utils';
import { rest } from 'msw'
import { server } from 'test/server/server';
import { API_URL } from 'config';
import { rides } from 'test/data';
import { AppProvider } from 'providers/app';
import { MemoryRouter } from 'react-router-dom'
import { Profile } from '..';

test('it should render initial UI', () => {
  render(
    <AppProvider >
      <Profile />
    </AppProvider>,
    {wrapper: MemoryRouter}
  );

  expect(screen.getByRole('heading', { name: 'Recent rides' })).toBeInTheDocument()
})

test('it should render recent ride list', async () => {
  server.use(
    rest.get(`${API_URL}/api/user/:id/rides`, (req, res, ctx) => {
      return res.once(ctx.json(rides))
    }),
  )
  render(
    <AppProvider>
      <Profile/>
    </AppProvider>
  );

  expect(screen.getByTestId('recent-rides')).toBeInTheDocument();
  await screen.findAllByTestId('ride-description-card');
  expect(screen.getAllByTestId('ride-description-card')).toHaveLength(rides.length)
})

test('it should display error message if query was unsuccessful', async () => {
  server.use(
    rest.get(`${API_URL}/api/user/:id/rides`, (req, res, ctx) => {
      return res.once(ctx.status(500))
    }),
  )
  render(
    <AppProvider>
      <Profile/>
    </AppProvider>
  );
  await screen.findByText('Something went wrong.');
})