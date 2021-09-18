import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render as rtlRender, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export * from '@testing-library/react';
export { userEvent }

export const renderWithRouter = (ui: React.ReactElement, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}