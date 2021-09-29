import React from 'react';
import { userEvent, render, screen, fireEvent, waitFor, act } from 'test/test-utils';
import { AppProvider } from 'providers/app';
import { Intervals, ZoneTimer } from 'features/timer';
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

test('it should render default interface', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);
  expect(screen.getByRole('table')).toBeInTheDocument()
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'Add Zone' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeInTheDocument()
  expect(screen.getByText('Total time')).toBeInTheDocument()
})

test('it should render initialized interface when no intervals added', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);
  expect(screen.getByText('No intervals set')).toBeInTheDocument()
  expect(screen.getByText('0:00')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeDisabled()
})

test('it should display the Add Zone modal when user clicks Add Zone', () => {
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

it('should create ride as logged in user', async () => {
  render(
    <AppProvider>
      <ZoneTimer />
    </AppProvider>
  )

  userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));

  const zoneDropdown = screen.getByTestId('zone-dropdown') as HTMLSelectElement;
  const lengthDropdown = screen.getByTestId('length-dropdown') as HTMLSelectElement;

  fireEvent.change(zoneDropdown, { target: { value: '1' }});
  fireEvent.change(lengthDropdown, { target: { value: '60' }});
  userEvent.click(screen.getByRole('button', { name: 'Add' }));

  userEvent.click(screen.getByRole('button', { name: 'Save ride' }));

  expect(screen.getByText('Name this ride')).toBeInTheDocument();

  const titleInput = screen.getByLabelText('Name');
  const typeInput = screen.getByLabelText('Type');
  const lengthInput = screen.getByLabelText('Length');

  fireEvent.change(titleInput, { target: { value: 'Test ride' }});
  fireEvent.change(typeInput, { target: { value: 'pzm' }});
  fireEvent.change(lengthInput, { target: { value: '2700' }});

  userEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => screen.getByText('Ride saved!'));
  expect(screen.getByText('Ride saved!')).toBeInTheDocument();
  expect(screen.getByText('Find it in your Saved Rides.')).toBeInTheDocument();
})