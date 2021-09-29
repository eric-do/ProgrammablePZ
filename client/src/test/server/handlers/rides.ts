import { API_URL } from 'config';
import { rest } from 'msw'
import { rides } from '../../data';

export const ridesHandlers = [
  rest.get(`${API_URL}/api/rides`, (req, res, ctx) => {
    return res(ctx.json(rides))
  }),
  rest.post(`${API_URL}/api/rides/:rideId/ride-count`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${API_URL}/api/rides/`, (req, res, ctx) => {
    return res(ctx.status(201))
  }),
]