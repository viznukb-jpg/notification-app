import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { withErrorHandler } from "@/lib/api-handler";
import { AppError } from "@/lib/errors";
import { CACHE_TTL_SECONDS } from "@/shared/config/constants";

export const GET = withErrorHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
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
      await redis.set(cacheKey, JSON.stringify(notifications), "EX", CACHE_TTL_SECONDS);
    } catch (error) {
      console.error("[Redis SET Error]:", error);
    }

    return NextResponse.json(notifications);
  }
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

    if (!body.title) {
      throw new AppError("Title is required", 400);
    }

    const notification = await db.createNotification(id, body.title);
    
    const cacheKey = `user:${id}:notifications`;
    try {
      await redis.del(cacheKey);
    } catch (error) {
      console.error("[Redis DEL Error]:", error);
    }

    return NextResponse.json(notification, { status: 201 });
  }
);
