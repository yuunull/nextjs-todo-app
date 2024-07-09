import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    if (!title) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Title is required",
      });
    }
    const newTodo = await prisma.todo.create({
      data: { title },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
