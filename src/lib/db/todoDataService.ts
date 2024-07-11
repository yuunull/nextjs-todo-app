import { Todo } from "@prisma/client";
import prisma from "./prisma";

export const fetchListData = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany({ orderBy: { id: "asc" } });
};

export const fetchData = async (id: number): Promise<Todo | null> => {
  return await prisma.todo.findUnique({ where: { id: id } });
};

export const createData = async (title: string): Promise<Todo> => {
  return await prisma.todo.create({ data: { title } });
};

export const updateData = async (id: number, title: string): Promise<Todo> => {
  return await prisma.todo.update({
    where: { id: id },
    data: { title: title },
  });
};

export const updateStatus = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  return await prisma.todo.update({
    where: { id: id },
    data: { completed: completed },
  });
};
