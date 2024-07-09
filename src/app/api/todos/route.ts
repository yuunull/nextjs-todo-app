import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
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

export async function PUT(req: NextRequest) {
  console.log("PUT", req.url);
  try {
    const { title, id } = await req.json();
    if (!title || !id) {
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
        title: title,
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
