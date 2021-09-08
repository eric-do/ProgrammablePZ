// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { setLogger } from 'react-query'
import { queryClient } from 'lib/react-query';
import { server } from 'test/server/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})

afterEach(async () => {
  queryClient.clear();
});