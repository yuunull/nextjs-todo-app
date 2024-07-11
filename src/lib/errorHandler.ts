import { NextResponse } from "next/server";

export const handleError = (error: any) => {
  console.error("Error:", error);
  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
};
