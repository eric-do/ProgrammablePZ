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
import { Search } from '..';

test('it should render initial UI', () => {
  render(
    <AppProvider >
      <Search />
    </AppProvider>
  );

  expect(screen.getByRole('heading', { name: 'Find members' })).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
})

xtest('it takes user input', async () => {
  render(
    <AppProvider >
      <Search />
    </AppProvider>
  );

  const searchInput = screen.getByPlaceholderText('Search');
  userEvent.type(searchInput, 'test');
  expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  await screen.findAllByTestId('user');
  const users = screen.getAllByTestId('user');
  expect(users.length).toBeGreaterThan(0);
})

