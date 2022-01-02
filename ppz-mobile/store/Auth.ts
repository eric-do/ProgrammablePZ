import { SetState } from 'zustand';
import { AuthenticatedUser } from '../types';
import { getToken, setToken, clearToken } from '../utils/storage'

export interface UserState {
  user: AuthenticatedUser;
  setUser: (u: AuthenticatedUser) => void;
  clearUser: () => void;
}

export const createUserSlice = (set: SetState<UserState>) => ({
  user: {
    jwt: null,
    user: null
  },
  setUser: (user: AuthenticatedUser) => set(() => ({ user })),
  clearUser: () => set(() => ({
    user: {
      jwt: null,
      user: null
    }
  }))
})