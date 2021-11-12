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

  expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Following' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Followers' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Find members' })).toBeInTheDocument();
})