import { db } from "@/lib/db";
import { AppStatistics } from "@/shared/types";
import { redis } from "@/lib/redis";
import {
  RUN_INTERVAL_MS,
  OLD_THRESHOLD_MS,
  CACHE_TTL_SECONDS,
} from "@/shared/config/constants";

export function startWorker() {
  const globalForWorker = globalThis as unknown as {
    __workerStarted: boolean | undefined;
  };

  if (globalForWorker.__workerStarted) {
    return;
  }
  globalForWorker.__workerStarted = true;

  console.log("[Worker] Started background worker");

  const runWorkerTask = async () => {
    try {
      const oldUnreadNotifications =
        db.getOldUnreadNotifications(OLD_THRESHOLD_MS);
      const affectedUsers = new Set<string>();

      for (const notif of oldUnreadNotifications) {
        await db.markAsRead(notif.id, notif.userId);
        affectedUsers.add(notif.userId);
      }

      for (const userId of affectedUsers) {
        const cacheKey = `user:${userId}:notifications`;
        try {
          await redis.del(cacheKey);
        } catch (error) {
          console.error(
            `[Worker] Failed to clear cache for user ${userId}`,
            error,
          );
        }
      }

      if (affectedUsers.size > 0) {
        console.log(
          `[Worker] Auto-read notifications for ${affectedUsers.size} users`,
        );
      }

      const statistics: AppStatistics = db.getStats();

      try {
        await redis.set(
          "app:statistics",
          JSON.stringify(statistics),
          "EX",
          CACHE_TTL_SECONDS,
        );
      } catch (error) {
        console.error("[Worker] Failed to save stats to Redis", error);
      }
    } catch (error) {
      console.error("[Worker] Error during execution", error);
    }
  };

  runWorkerTask();
  setInterval(runWorkerTask, RUN_INTERVAL_MS);
}
