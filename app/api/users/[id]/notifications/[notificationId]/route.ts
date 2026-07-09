import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { withErrorHandler } from "@/lib/api-handler";
import { AppError } from "@/lib/errors";

export const PATCH = withErrorHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ id: string; notificationId: string }> },
  ) => {
    const { id, notificationId } = await params;
    const updatedNotification = await db.markAsRead(notificationId, id);

    if (!updatedNotification) {
      throw new AppError("Notification not found", 404);
    }

    const cacheKey = `user:${id}:notifications`;
    try {
      await redis.del(cacheKey);
    } catch (error) {
      console.error("[Redis DEL Error]:", error);
    }

    return NextResponse.json(updatedNotification);
  },
);
