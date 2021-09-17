import { API_URL } from 'config';
import { rest } from 'msw'
import { authResponse } from '../../data';


export const authHandlers = [
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    console.log('LOGIN MOCK')
    return res(ctx.json(authResponse))
  }),
  rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
    console.log('REGISTER MOCK')
    return res(ctx.json(authResponse))
  }),
  rest.get(`${API_URL}/auth/validate`, (req, res, ctx) => {
    console.log('VALIDATE MOCK')
    return res(ctx.json(authResponse))
  }),
]