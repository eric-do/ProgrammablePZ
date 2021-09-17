import { ridesHandlers } from "./rides";
import { authHandlers } from "./auth";

export const handlers = [
  ...ridesHandlers,
  ...authHandlers
];