import { axios } from "lib";
import { AuthenticatedUser } from "types";

export const validateToken = (): Promise<AuthenticatedUser> => {
  return axios.get('/auth/validate');
}