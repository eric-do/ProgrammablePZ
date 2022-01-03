import * as AuthAPI from "features/auth/api";
import * as storage from 'utils/storage';
import { LoginCredentials, AuthenticatedUser } from "types";

export const login = async (credentials: LoginCredentials) => {
  try {
    const authentication = await AuthAPI.loginUser(credentials);
    await storage.setToken(authentication.jwt);
    return authentication.user;
  } catch (err) {
    console.log(err)
  }
}

export const validateToken = async () => {
  try {
    const auth = await AuthAPI.validateToken();
    await storage.setToken(auth.jwt)
    return auth;
  } catch (err) {
    await storage.clearToken();
  }
}