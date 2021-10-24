import { ridesHandlers } from "./rides";
import { authHandlers } from "./auth";
import { userHandlers } from "./user";

export const handlers = [
  ...ridesHandlers,
  ...authHandlers,
  ...userHandlers
];