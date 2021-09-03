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
  expect(screen.getByRole('heading', { name: 'Zone' })).toBeInTheDocument();
  expect(screen.getByText('0:00')).toBeInTheDocument();
  expect(screen.getAllByRole('progressbar')).toHaveLength(2);
})

it('should render zone chart', () => {
  const props = {
    workout: {
      timeInSeconds: 30,
      intervals: [{
        zone: '1',
        length: 30
      }]
    },
    displayTimer: () => {}
  }
  render(<Timer {...props}/>)
  expect(screen.getByTestId('active-zone-graph')).toBeInTheDocument();
})