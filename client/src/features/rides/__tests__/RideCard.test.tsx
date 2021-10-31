import React from 'react';
import {
  userEvent,
  render,
  screen,
  waitFor
} from 'test/test-utils';
import { RideCard } from 'features/rides';
import { rides } from 'test/data';

test('it should render initial UI', () => {
  render(<RideCard ride={rides[0]} onClick={ride => {}}/>);

  expect(screen.queryAllByTestId('interval-chart-bar')).toHaveLength(rides[0].intervals.length);
  expect(screen.getByText(`Rating: ${rides[0].ratings?.rating} / 5`)).toBeInTheDocument();
  expect(screen.getByText(`${Math.floor(rides[0].timeInSeconds / 60)} minutes`)).toBeInTheDocument()
})

test('it should invoke click handler on click', () => {
  const clickHandler = jest.fn();
  render(<RideCard ride={rides[0]} onClick={clickHandler}/>);
  userEvent.click(screen.getByTestId('ride-description-card'));
  expect(clickHandler).toHaveBeenCalled();
})
