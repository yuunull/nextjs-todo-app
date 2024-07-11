import { NextRequest, NextResponse } from "next/server";
import { createData, fetchListData } from "@/lib/db/todoDataService";
import { commonMiddleware } from "@/lib/commonMiddleware";

const getHandler = async (): Promise<NextResponse> => {
  const data = await fetchListData();
  return NextResponse.json(data);
};

const postHandler = async (request: NextRequest): Promise<NextResponse> => {
  const { title } = await request.json();
  if (!title) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Title is required",
    });
  }
  const newTodo = await createData(title);
  return NextResponse.json(newTodo, { status: 201 });
};

export const GET = commonMiddleware(getHandler);
export const POST = commonMiddleware(postHandler);
