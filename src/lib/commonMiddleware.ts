// utils/withMiddleware.ts

import { NextRequest, NextResponse } from "next/server";
import { handleError } from "./errorHandler";

export const commonMiddleware =
  (handler: (request: NextRequest) => Promise<NextResponse>) =>
  async (request: NextRequest) => {
    // 共通の前処理を実行

    try {
      // 実際の処理を実行
      return await handler(request);
    } catch (error) {
      // 共通のエラーハンドリング
      return handleError(error);
    }
  };
