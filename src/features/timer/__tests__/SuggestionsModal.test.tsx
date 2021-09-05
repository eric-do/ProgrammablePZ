import React from 'react';
import { SuggestionsModal} from 'features/timer/components/SuggestionsModal';
import { render, screen } from 'test/test-utils';

const defaultProps = {
  isOpen: true,
  onClose: () => {},
  setWorkout: () => {}
}
it('should render default UI', () => {
  render(<SuggestionsModal {...defaultProps} />);

  expect(screen.getByText('All rides')).toBeInTheDocument();
  expect(screen.getByText('All lengths')).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
})