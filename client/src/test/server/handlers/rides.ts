import { API_URL } from 'config';
import { rest } from 'msw'
import { rides } from '../../data';

export const ridesHandlers = [
  rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
    return res(ctx.json(rides))
  }),
]