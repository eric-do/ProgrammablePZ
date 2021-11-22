import { ridesHandlers } from "./rides";
import { authHandlers } from "./auth";
import { userHandlers } from "./user";
import { friendshipHandlers } from "./friendships";

export const handlers = [
  ...ridesHandlers,
  ...authHandlers,
  ...userHandlers,
  ...friendshipHandlers
];