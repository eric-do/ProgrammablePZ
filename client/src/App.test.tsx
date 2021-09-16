import React from "react"
import { screen } from "@testing-library/react"
import { Router } from "react-router-dom";
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from 'test/server/server';
import { createMemoryHistory } from 'history'
import {
  render,
  userEvent,
  fireEvent,
  waitFor
} from "test/test-utils"
import { App } from "./App"
import { API_URL } from "config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

describe('Navigation', () => {
  test('it should render navigation and app drawer', () => {
    render(<App />);
    const hamburgerButton = screen.getByRole('button', { name: 'Toggle app drawer'});
    expect(screen.getByRole('button', { name: 'Toggle app drawer'})).toBeInTheDocument();
    userEvent.click(hamburgerButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create ride' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Popular rides' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Saved rides' })).toBeInTheDocument();
  })

  xtest('user can navigate to login page', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(screen.getByRole('heading', { name: 'Login '})).toBeInTheDocument()
  })
})


describe('Create custom ride', () => {
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

  test('user can add interval to ride, and time is shown in minutes', () => {
    render(<App />);
    const modalButton = screen.getByRole('button', { name: 'Add Zone' });
    const startButton = screen.getByRole('button', { name: 'Start!' });
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

    userEvent.click(startButton);
    expect(screen.getByRole('heading', { name: 'Zone 1' })).toBeInTheDocument();
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

  test(
    'it should allow users to select a suggested ride from modal',
    async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const suggestionsLink = screen.getByRole('link', { name: 'Need a suggestion?' });
    userEvent.click(suggestionsLink);

    expect(screen.getByText('Popular rides')).toBeInTheDocument();

    await waitFor(() => screen.getAllByTestId('modal-rides-table'))

    const suggestedRides = screen.getAllByTestId('modal-table-row');
    expect(screen.getByTestId('modal-rides-table')).toBeInTheDocument();
    expect(suggestedRides).toHaveLength(3)

    userEvent.click(suggestedRides[0]);
    expect(screen.getByRole('heading', { name: 'Zones' })).toBeInTheDocument();
  })
})

describe('Rides page', () => {
  test('navigate to rides page, select ride, start ride', async () => {
    const history = createMemoryHistory({ initialEntries: [ '/' ] })
    let count = 0;

    server.use(
      rest.post(`${API_URL}/api/rides/:rideId/ride-count`, (req, res, ctx) => {
        count++;
        return res.once(ctx.status(200))
      }),
    );

    render(
      <Router history={history}>
        <App />
      </Router>,
    )

    const suggestionsLink = screen.getByRole('link', { name: 'Need a suggestion?' });
    userEvent.click(suggestionsLink);

    await waitFor(() => screen.getByRole('link', { name: 'See more rides' }));

    const seeMoreLink = screen.getByRole('link', { name: 'See more rides' });
    userEvent.click(seeMoreLink);

    expect(screen.getByRole('heading', {name: 'Power Zone Rides' })).toBeInTheDocument();

    await waitFor(() => screen.getAllByTestId('ride-description-card'));
    expect(screen.queryAllByTestId('ride-description-card')).toBeTruthy();

    const rides = screen.queryAllByTestId('ride-description-card');

    userEvent.click(rides[0]);

    expect(screen.getByRole('heading', { name: 'Zones' })).toBeInTheDocument();
    expect(screen.getByTestId('interval-zone-chart')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Start!' }));
    expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument();
    expect(screen.getByTestId('zone-timer')).toBeInTheDocument();
    expect(screen.getByTestId('ride-timer')).toBeInTheDocument();
  })
})