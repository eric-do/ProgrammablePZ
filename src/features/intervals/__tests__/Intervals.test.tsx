import React from 'react';
import { userEvent, render, screen, fireEvent } from 'test/test-utils';
import { Intervals } from '../components/';

const defaultProps = {
  startWorkout: () => {}
}

test('it should render default interface', () => {
  render(<Intervals {...defaultProps}/>);
  expect(screen.getByRole('table')).toBeInTheDocument()
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'Add Zone' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeInTheDocument()
  expect(screen.getByText('Total time')).toBeInTheDocument()
})

test('it should render initialized interface when no intervals added', () => {
  render(<Intervals {...defaultProps}/>);
  expect(screen.getByText('No intervals set')).toBeInTheDocument()
  expect(screen.getByText('0:00')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeDisabled()
})

test('it should display the Add Zone modal when user clicks Add Zone', () => {
  render(<Intervals {...defaultProps}/>);
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

test('it should update table when user adds new interval', () => {
  render(<Intervals {...defaultProps}/>);
  const modalButton = screen.getByRole('button', { name: 'Add Zone' });

  expect(screen.getAllByRole('row')).toHaveLength(2);
  userEvent.click(modalButton);

  const zoneDropdown = screen.getByTestId('zone-dropdown') as HTMLSelectElement;
  const lengthDropdown = screen.getByTestId('length-dropdown') as HTMLSelectElement;
  const addButton = screen.getByRole('button', { name: 'Add' });

  fireEvent.change(zoneDropdown, { target: { value: '1' }});
  fireEvent.change(lengthDropdown, { target: { value: '60' }});
  userEvent.click(addButton);

  expect(screen.getAllByRole('row')).toHaveLength(3);
  expect(screen.getAllByText('1:00')).toHaveLength(2);
})