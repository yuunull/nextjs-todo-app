import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const { completed, id } = await req.json();
    if (!id) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Title is required",
      });
    }

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (!existingTodo) {
      return new NextResponse(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const newTodo = await prisma.todo.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        completed: completed,
      },
    });

    return NextResponse.json(newTodo, { status: 200 });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
