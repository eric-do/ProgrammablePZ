import { API_URL } from 'config';
import { rest } from 'msw'
import { rides } from '../../data';
import { generateListOfFriends } from 'test/data-generators';

export const userHandlers = [
  rest.get(`${API_URL}/api/users/lookup`,
    (req, res, ctx) => {
      const users = generateListOfFriends();
      console.log(users)
      return res(ctx.json(users))
  }),

  rest.get(`${API_URL}/api/users/:userId/rides_taken`,
    (req, res, ctx) => {
      return res(ctx.json(rides))
  }),

  rest.post(`${API_URL}/api/users/:userId/rides_taken`,
    (req, res, ctx) => {
      return res(ctx.status(201))
  }),
]