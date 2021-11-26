import { API_URL } from 'config';
import { rest } from 'msw'
import {
  generateListOfFriends,
  generateFriendshipMetadata
} from '../../data-generators';

export const friendshipHandlers = [
  rest.get(`${API_URL}/api/friendships/friends`,
    (req, res, ctx) => {
      console.log('GETTING FRIENDS')
      return res(ctx.json(generateListOfFriends()))
  }),

  rest.post(`${API_URL}/api/friendships/create`,
    (req, res, ctx) => {
      return res(ctx.status(201))
  }),

  rest.post(`${API_URL}/api/friendships/destroy`,
    (req, res, ctx) => {
      return res(ctx.status(201))
  }),

  rest.get(`${API_URL}/api/friendships/metadata`,
    (req, res, ctx) => {
      return res(ctx.json(generateFriendshipMetadata()))
  }),
]