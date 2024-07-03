import { setupServer } from "msw/node";
import { handlers } from "../mocks/api/todos";

export const server = setupServer(...handlers);
