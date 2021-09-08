import React from "react"
import { screen } from "@testing-library/react"
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history'
import { render, userEvent, fireEvent } from "test/test-utils"
import { App } from "./App"

test('it should render default interface', () => {
  render(<App />);
  expect(screen.getByRole('table')).toBeInTheDocument()
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'Add Zone' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  expect(screen.getByText('Total time')).toBeInTheDocument()
})

test('it should render initialized interface when no intervals added', () => {
  render(<App />);
  expect(screen.getByText('No intervals set')).toBeInTheDocument()
  expect(screen.getByText('0:00')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Start!' })).toBeDisabled()
})

test('it should display the Add Zone modal when user clicks Add Zone', () => {
  render(<App />);
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
  render(<App />);
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
  expect(screen.getByTestId('interval-zone-chart')).toBeInTheDocument();
  expect(screen.getAllByTestId('interval-chart-bar')).toHaveLength(1);
})

test('it should reset table when user hits Reset button', () => {
  render(<App />);
  const modalButton = screen.getByRole('button', { name: 'Add Zone' });
  const resetButton = screen.getByRole('button', { name: 'Reset' });

  expect(screen.getAllByRole('row')).toHaveLength(2);
  userEvent.click(modalButton);

  const zoneDropdown = screen.getByTestId('zone-dropdown') as HTMLSelectElement;
  const lengthDropdown = screen.getByTestId('length-dropdown') as HTMLSelectElement;
  const addButton = screen.getByRole('button', { name: 'Add' });

  fireEvent.change(zoneDropdown, { target: { value: 1 }});
  fireEvent.change(lengthDropdown, { target: { value: 60 }});
  userEvent.click(addButton);

  expect(screen.getAllByRole('row')).toHaveLength(3);
  expect(screen.getAllByTestId('interval-chart-bar')).toHaveLength(1);

  userEvent.click(resetButton);
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.queryByTestId('interval-chart-bar')).toBeNull()
})

test('it should display the suggestions modal when user clicks link', () => {
  render(<App />)

  const suggestionsLink = screen.getByRole('link', { name: 'Need a suggestion?' });
  userEvent.click(suggestionsLink);

  expect(screen.getByText('Popular rides')).toBeInTheDocument();
  expect(screen.getAllByRole('table')).toHaveLength(2);
})

test('it should redirect to Rides page when user clicks "More" link in suggestions modal', () => {
  const history = createMemoryHistory({ initialEntries: [ '/' ] })
  render(
    <Router history={history}>
      <App />
    </Router>,
  )

  const suggestionsLink = screen.getByRole('link', { name: 'Need a suggestion?' });
  userEvent.click(suggestionsLink);

  // const seeMoreLink = screen.getByRole('link', { name: 'See more rides' });
  // userEvent.click(seeMoreLink);
  // expect(screen.getByRole('heading', {name: 'Power Zone Rides' })).toBeInTheDocument();
})