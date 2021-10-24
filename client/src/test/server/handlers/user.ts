import { API_URL } from 'config';
import { rest } from 'msw'
import { rides } from '../../data';

export const userHandlers = [
  rest.get(`${API_URL}/api/user/:username/rides`, (req, res, ctx) => {
    return res(ctx.json(rides))
  }),
]