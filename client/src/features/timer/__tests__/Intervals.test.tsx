import React from 'react';
import { userEvent, render, screen, fireEvent } from 'test/test-utils';
import { AppProvider } from 'providers/app';
import { Intervals } from 'features/timer';
import { Interval } from 'types';

const defaultProps = {
  intervals: [],
  addInterval: (interval: Interval) => {},
  resetIntervals: () => {},
  startWorkout: () => {},
  time: {
    minutes: 0,
    seconds: 0,
    timeInSeconds: 0,
  }
}

xtest('it should render default interface', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);
  expect(screen.getByRole('table')).toBeInTheDocument()
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'Add Zone' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeInTheDocument()
  expect(screen.getByText('Total time')).toBeInTheDocument()
})

xtest('it should render initialized interface when no intervals added', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);
  expect(screen.getByText('No intervals set')).toBeInTheDocument()
  expect(screen.getByText('0:00')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeDisabled()
})

xtest('it should display the Add Zone modal when user clicks Add Zone', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);
  userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));

  // Header
  expect(screen.getByText('Add Power Zone')).toBeInTheDocument();

  // Dropdowns
  expect(screen.getByText('Zone 1')).toBeInTheDocument();
  expect(screen.getByText('30 seconds')).toBeInTheDocument();

  // Buttons
  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
})

