import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { RUN_INTERVAL_MS, OLD_THRESHOLD_MS } from "@/shared/config/constants";

export function startWorker() {
  const globalForWorker = globalThis as unknown as {
    __workerStarted: boolean | undefined;
  };

  if (globalForWorker.__workerStarted) {
    return;
  }
  globalForWorker.__workerStarted = true;

  console.log("[Worker] Started background worker");

  setInterval(async () => {
    try {
      const now = Date.now();
      const allNotifications = db.getRawNotifications();
      const affectedUsers = new Set<string>();

      for (const notif of allNotifications) {
        if (!notif.isRead && now - notif.createdAt > OLD_THRESHOLD_MS) {
          notif.isRead = true;
          affectedUsers.add(notif.userId);
        }
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

      const users = db.getRawUsers();

      const stats = {
        usersCount: users.length,
        notificationsCount: allNotifications.length,
        unreadCount: allNotifications.filter((n) => !n.isRead).length,
      };

      try {
        await redis.set("app:statistics", JSON.stringify(stats));
      } catch (error) {
        console.error("[Worker] Failed to save stats to Redis", error);
      }
    } catch (error) {
      console.error("[Worker] Error during execution", error);
    }
  }, RUN_INTERVAL_MS);
}
