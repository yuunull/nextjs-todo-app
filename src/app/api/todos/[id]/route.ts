import { NextRequest, NextResponse } from "next/server";
import { fetchData, updateData } from "@/lib/db/todoDataService";
import { commonMiddleware } from "@/lib/commonMiddleware";

const putHandler = async (req: NextRequest): Promise<NextResponse> => {
  const { title, id } = await req.json();
  if (!title || !id) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Title is required",
    });
  }

  const existingTodo = fetchData(parseInt(id, 10));

  if (!existingTodo) {
    return new NextResponse(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const updatedTodo = updateData(parseInt(id, 10), title);
  return NextResponse.json(updatedTodo, { status: 200 });
};

export const PUT = commonMiddleware(putHandler);
