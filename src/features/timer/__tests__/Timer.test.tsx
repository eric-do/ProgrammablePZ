import React from 'react';
import { Timer } from '../components/Timer';
import { render, screen } from 'test/test-utils';

it('should render with default props', () => {
  const defaultProps = {
    workout: {
      timeInSeconds: 0,
      intervals: []
    },
    displayTimer: () => {}
  }
  render(<Timer {...defaultProps}/>)
  expect(screen.getByRole('heading', { name: 'Timer' })).toBeInTheDocument();
  expect(screen.getByText('0:00')).toBeInTheDocument();
  expect(screen.getAllByRole('progressbar')).toHaveLength(2);
})