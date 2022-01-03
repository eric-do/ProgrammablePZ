import { loginUser } from "features/auth/api";
import * as storage from 'utils/storage';
import { LoginCredentials } from "types";

export const login = async (credentials: LoginCredentials) => {
  try {
    const authentication = await loginUser(credentials);
    await storage.setToken(authentication.jwt);
    return authentication.user;
  } catch (err) {

  }
}