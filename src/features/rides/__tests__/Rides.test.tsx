import React from 'react';
import { userEvent, render, screen, fireEvent } from 'test/test-utils';
import { MemoryRouter } from 'react-router-dom'
import { Rides } from 'features/rides';

test('it should render initial UI', () => {
  render(<Rides />, {wrapper: MemoryRouter});

  expect(screen.getByText('All rides')).toBeInTheDocument();
  expect(screen.getByText('All lengths')).toBeInTheDocument();
})