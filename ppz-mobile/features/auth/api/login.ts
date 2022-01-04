import { useState, useEffect } from 'react';
import { LoginCredentials, AuthenticatedUser } from 'types';
import { axios } from 'lib';
import * as storage from 'utils/storage';
import { useStore } from 'store';

export const loginUser = (credentials: LoginCredentials): Promise<AuthenticatedUser> => {
  return axios.post('/auth/login', credentials);
}

export const useLoginUser = () => {
  const [auth, setAuth] = useState<AuthenticatedUser | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<LoginCredentials | null>();
  const setUser = useStore(state => state.setUser);

  const login = (credentials: LoginCredentials) => setCredentials(credentials);

  useEffect(() => {
    const login = async () => {
      try {
        if (credentials) {
          const { username, password } = credentials;
          const auth = await loginUser({ username, password });
          await storage.setToken(auth.jwt);
          setUser(auth);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }

    login();
  }, [credentials])

  return { auth, error, login };
};