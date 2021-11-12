import React from "react"
import { screen } from "@testing-library/react"
import { Router } from "react-router-dom";
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from 'test/server/server';
import { createMemoryHistory } from 'history'
import {
  render,
  renderWithRouter,
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
    renderWithRouter(<App />);
    const hamburgerButton = screen.getByRole('button', { name: 'Toggle app drawer'});
    expect(screen.getByRole('button', { name: 'Toggle app drawer'})).toBeInTheDocument();
    userEvent.click(hamburgerButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create ride' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Popular rides' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Recent rides' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Saved rides' })).toBeInTheDocument();
    expect(screen.getByTestId('sound-button')).toBeInTheDocument();
  })

  test('user can navigate to login page', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('button', { name: 'Log in' }))
    expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument()
  })

  test('user can navigate to registration page', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('button', { name: 'Sign up' }))
    expect(screen.getByRole('heading', { name: 'Sign up' })).toBeInTheDocument()
  })

  xtest('logged in user can navigate to profile page from Profile link', async () => {
    server.use(
      rest.get(`${API_URL}/auth/validate`, (req, res, ctx) => {
        console.log('SENDING USER')
        return res.once(ctx.json({
          username: 'test_user',
          email: 'test@user.com',
          id: 'abc123'
        }))
      }),
    );

    renderWithRouter(
      <App />
    );

    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    await screen.findByRole('heading', { name: 'test_user' });
    userEvent.click(screen.getByRole('link', { name: 'Profile' }))
    expect(screen.getByRole('heading', { name: 'Recent rides' })).toBeInTheDocument()
  })

  test('user can navigate to Create Ride page', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('link', { name: 'Create ride' }))
    expect(screen.getByRole('heading', { name: 'Zones' })).toBeInTheDocument()
  })

  test('user can navigate to Popular Rides page', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('link', { name: 'Popular rides' }))
    expect(screen.getByRole('heading', { name: 'Power Zone Rides' })).toBeInTheDocument()
  })

  test('Unauthenticatd user gets redirected to login', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('link', { name: 'Saved rides' }))
    expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument()
  })
})

xdescribe('Auth', () => {
  test('Successful registration takes user to homepage', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('button', { name: 'Sign up' }))

    const usernameInput = screen.getByLabelText('Username', {exact: false});
    const emailInput = screen.getByLabelText('Email', {exact: false});
    const passwordInput = screen.getByLabelText('Password', {exact: false});

    fireEvent.change(usernameInput, { target: { value: 'test_user '}})
    fireEvent.change(emailInput, { target: { value: 'user@email.com '}})
    fireEvent.change(passwordInput, { target: { value: 'password123'}})
    fireEvent.submit(screen.getByTestId('registration-form'));

    await waitFor(() => screen.getByRole('heading', { name: 'Zones' }))
    expect(screen.getByRole('heading', { name: 'Zones' })).toBeInTheDocument()
  })

  test('Successful login takes user to homepage', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    const usernameInput = screen.getByLabelText('Username', {exact: false});
    const passwordInput = screen.getByLabelText('Password', {exact: false});

    fireEvent.change(usernameInput, { target: { value: 'test_user '}})
    fireEvent.change(passwordInput, { target: { value: 'password123'}})
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => screen.getByRole('heading', { name: 'Zones' }))
    expect(screen.getByRole('heading', { name: 'Zones' })).toBeInTheDocument()
  })

  xtest('login form displays error message for invalid login', async () => {
    server.use(
      rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            error: 'Invalid username or password'
          })
        )
      }),
    );

    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Toggle app drawer'}));
    userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    const usernameInput = screen.getByLabelText('Username', {exact: false});
    const passwordInput = screen.getByLabelText('Password', {exact: false});
    fireEvent.change(usernameInput, { target: { value: 'test_user '}})
    fireEvent.change(passwordInput, { target: { value: 'password123'}})
    userEvent.click(screen.getByRole('button', { name: 'Submit'}));

    await waitFor(() => screen.getByRole('alert'))
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  })
})


describe('Create custom ride', () => {
  test('it should render default interface', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Add Zone' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start!' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save ride' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    expect(screen.getByText('Total time')).toBeInTheDocument()
  })

  test('it should render initialized interface when no intervals added', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('No intervals set')).toBeInTheDocument()
    expect(screen.getByText('0:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start!' })).toBeDisabled()
  })

  test('it should display the Add Zone modal when user clicks Add Zone', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));
    expect(screen.getByText('Add Power Zone')).toBeInTheDocument();
  })

  test('it can create and start ride', () => {
    renderWithRouter(<App />);
    const modalButton = screen.getByRole('button', { name: 'Add Zone' });
    const startButton = screen.getByRole('button', { name: 'Start!' });
    expect(screen.getAllByRole('row')).toHaveLength(2);
    userEvent.click(modalButton);

    userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByText('7:00')).toHaveLength(2);
    expect(screen.getByTestId('interval-zone-chart')).toBeInTheDocument();
    expect(screen.getAllByTestId('interval-chart-bar')).toHaveLength(1);

    userEvent.click(startButton);
    expect(screen.getByRole('heading', { name: 'Zone 3' })).toBeInTheDocument();
  })

  test('it should reset table when user hits Reset button', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByRole('row')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Add Zone' }));
    userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByTestId('interval-chart-bar')).toHaveLength(1);

    userEvent.click(screen.getByRole('button', { name: 'Reset' }));
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