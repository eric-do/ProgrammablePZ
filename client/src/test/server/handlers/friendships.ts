import { API_URL } from 'config';
import { rest } from 'msw'
import { generateListOfFriends } from '../../data-generators';

export const userHandlers = [
  rest.get(`${API_URL}/api/friendships/friends`,
    (req, res, ctx) => {
      return res(ctx.json(generateListOfFriends()))
  }),

  rest.post(`${API_URL}/api/friendships/create`,
    (req, res, ctx) => {
      return res(ctx.status(201))
  }),
]