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

test('it should render UI after getting metadata', async () => {
  render(
    <AppProvider >
      <Profile />
    </AppProvider>,
    {wrapper: MemoryRouter}
  );

  expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();

  await screen.findByText('Following');
  expect(screen.getByText('Following')).toBeInTheDocument();
  expect(screen.getByText('Followers')).toBeInTheDocument();
  expect(screen.getByText('Find members')).toBeInTheDocument();
})