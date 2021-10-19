import React from 'react';
import {
  userEvent,
  render,
  screen,
  fireEvent,
  waitFor
} from 'test/test-utils';
import { AppProvider } from 'providers/app';
import { Intervals, ZoneTimer } from 'features/timer';
import { SaveRideModal } from '../components/SaveRideModal';
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

test('it should add and remove zone intervals', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);

  userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));
  userEvent.click(screen.getByRole('button', { name: 'Add' }));

  expect(screen.getByRole('columnheader', { name: '7:00' })).toBeInTheDocument();
  expect(screen.getByTestId('interval-chart-bar')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('interval-chart-bar'))
  expect(screen.getByRole('columnheader', { name: '0:00' })).toBeInTheDocument();
  expect(screen.queryByTestId('interval-chart-bar')).not.toBeInTheDocument();
})

test('it should display the Add Zone modal when user clicks Add Zone', () => {
  render(<AppProvider><Intervals {...defaultProps}/></AppProvider>);
  userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));

  // Header
  expect(screen.getByText('Add Power Zone')).toBeInTheDocument();

  // Sliders
  expect(screen.getByTestId('zone-slider')).toBeInTheDocument();
  expect(screen.getByTestId('time-slider')).toBeInTheDocument();

  // Buttons
  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
})

it('should display Save Ride modal', async () => {
  render(
    <AppProvider>
      <ZoneTimer />
    </AppProvider>
  )

  userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));
  userEvent.click(screen.getByRole('button', { name: 'Add' }));
  userEvent.click(screen.getByRole('button', { name: 'Save ride' }));

  expect(screen.getByText('Name this ride')).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Type')).toBeInTheDocument();
  expect(screen.getByLabelText('Length')).toBeInTheDocument();
})

it('should create ride as logged in user', async () => {
  const handleClose = jest.fn()
  render(
    <AppProvider>
      <SaveRideModal isOpen={true} onClose={handleClose}/>
    </AppProvider>
  )

  const titleInput = screen.getByLabelText('Name');
  const typeInput = screen.getByLabelText('Type');
  const lengthInput = screen.getByLabelText('Length');

  fireEvent.change(titleInput, { target: { value: 'Test ride' }});
  fireEvent.change(typeInput, { target: { value: 'pzm' }});
  fireEvent.change(lengthInput, { target: { value: '2700' }});

  fireEvent.submit(screen.getByTestId('save-ride-form'));

  await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1))
  expect(screen.getByText('Ride saved!')).toBeInTheDocument();
  expect(screen.getByText('Find it in your Saved Rides.')).toBeInTheDocument();
})