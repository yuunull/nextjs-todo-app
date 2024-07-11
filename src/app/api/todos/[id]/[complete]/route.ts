import { NextRequest, NextResponse } from "next/server";
import { fetchData, updateStatus } from "@/lib/db/todoDataService";
import { commonMiddleware } from "@/lib/commonMiddleware";

const putHandler = async (req: NextRequest): Promise<NextResponse> => {
  const { completed, id } = await req.json();
  if (!id) {
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

  const updatedTodo = updateStatus(parseInt(id, 10), completed);
  return NextResponse.json(updatedTodo, { status: 200 });
};

export const PUT = commonMiddleware(putHandler);
