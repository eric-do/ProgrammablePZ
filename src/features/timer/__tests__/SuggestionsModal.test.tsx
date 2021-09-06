import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from 'test/test-utils';
import { SuggestionsModal } from 'features/timer/components/SuggestionsModal';

const defaultProps = {
  isOpen: true,
  onClose: () => {},
  setWorkout: () => {}
}
it('should render default UI', () => {
  render(<Router><SuggestionsModal {...defaultProps} /></Router>);

  expect(screen.getByText('All rides')).toBeInTheDocument();
  expect(screen.getByText('All lengths')).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
})