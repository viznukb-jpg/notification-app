import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { withErrorHandler } from "@/lib/api-handler";
import { AppError } from "@/lib/errors";
import { CACHE_TTL_SECONDS } from "@/shared/config/constants";
import { z } from "zod";

const createNotificationSchema = z.object({
  title: z.string().min(1, "Title is required").max(1000, "Title is too long"),
});

export const GET = withErrorHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    if (!(await db.userExists(id))) {
      throw new AppError("User not found", 404);
    }

    const cacheKey = `user:${id}:notifications`;

    let cached = null;
    try {
      cached = await redis.get(cacheKey);
    } catch (error) {
      console.error("[Redis GET Error]:", error);
    }

    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const notifications = await db.getUserNotifications(id);

    try {
      await redis.set(
        cacheKey,
        JSON.stringify(notifications),
        "EX",
        CACHE_TTL_SECONDS,
      );
    } catch (error) {
      console.error("[Redis SET Error]:", error);
    }

    return NextResponse.json(notifications);
  },
);

export const POST = withErrorHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    let body;
    try {
      body = await request.json();
    } catch {
      throw new AppError("Invalid JSON body", 400);
    }

    const parseResult = createNotificationSchema.safeParse(body);
    if (!parseResult.success) {
      throw new AppError(parseResult.error.issues[0].message, 400);
    }

    const { title } = parseResult.data;

    const notification = await db.createNotification(id, title);
    if (!notification) {
      throw new AppError("User not found", 404);
    }

    const cacheKey = `user:${id}:notifications`;
    try {
      await redis.del(cacheKey);
    } catch (error) {
      console.error("[Redis DEL Error]:", error);
    }

    return NextResponse.json(notification, { status: 201 });
  },
);
