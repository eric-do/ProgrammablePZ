import React from 'react';
import {
  render,
  screen
} from 'test/test-utils';
import { Page } from './Page';

test('it should render UI', async () => {
  render(
    <Page title='Test title' >
      <div>Test content</div>
    </Page>,
  );

  expect(screen.getByRole('heading', { name: 'Test title' })).toBeInTheDocument();
  expect(screen.getByText('Test content')).toBeInTheDocument();
})