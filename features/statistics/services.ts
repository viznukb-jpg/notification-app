import { redis } from "@/lib/redis";
import { AppStatistics } from "@/shared/types";

export async function getAppStatistics(): Promise<AppStatistics | null> {
  try {
    const statsJson = await redis.get("app:statistics");
    if (statsJson) {
      return JSON.parse(statsJson) as AppStatistics;
    }
  } catch (error) {
    console.error(
      "[Statistics Service] Failed to fetch stats from Redis",
      error,
    );
  }

  return null;
}
