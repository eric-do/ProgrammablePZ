import { SetState } from 'zustand';
import { AuthenticatedUser } from '../types';
import { getToken, setToken, clearToken } from '../utils/storage'
import { StoreState } from './'

export interface AuthState {
  auth: AuthenticatedUser | null;
  setUser: (u: AuthenticatedUser) => void;
  clearUser: () => void;
}

export const createUserSlice = (set: SetState<StoreState>) => ({
  auth: null,
  setUser: (auth: AuthenticatedUser) => set(() => ({ auth })),
  clearUser: () => set(() => ({
    auth: null
  }))
})