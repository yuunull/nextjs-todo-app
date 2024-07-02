import { http, HttpResponse } from "msw";

type Params = {};

type RequestBody = {};

type ResponseBody = {};

const GetTodos = http.get<Params, RequestBody, ResponseBody, "/api/todos">(
  "/api/todos",
  async () => {
    return HttpResponse.json([
      { id: 1, title: "タスク 1", completed: false },
      { id: 2, title: "タスク 2", completed: true },
    ]);
  }
);

export const handlers = [GetTodos];
