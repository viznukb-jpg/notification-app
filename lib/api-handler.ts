import { NextResponse } from "next/server";
import { AppError } from "./errors";

export function withErrorHandler<T>(
  handler: (
    request: Request,
    context: T,
  ) => Promise<NextResponse> | NextResponse,
) {
  return async (request: Request, context: T) => {
    try {
      return await handler(request, context);
    } catch (error: unknown) {
      console.error("[API Error]:", error);

      if (error instanceof AppError) {
        return NextResponse.json(
          { error: error.message },
          { status: error.statusCode },
        );
      }

      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  };
}
