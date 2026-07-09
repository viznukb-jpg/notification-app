import { redis } from "@/lib/redis";
import { db } from "@/lib/db";
import { StatCard } from "./StatCard";
import { AppStatistics } from "@/shared/types";

export async function StatisticsContainer() {
  let stats: AppStatistics | null = null;

  try {
    const cached = await redis.get("app:statistics");
    stats = cached ? JSON.parse(cached) : db.getStats();
  } catch (error) {
    console.error("[StatisticsContainer] Error fetching stats", error);
    stats = db.getStats();
  }

  return (
    <div className="gap-6 grid sm:grid-cols-3 mx-auto max-w-4xl">
      <StatCard
        value={stats?.usersCount || 0}
        label="Total Users"
        color="blue"
      />
      <StatCard
        value={stats?.notificationsCount || 0}
        label="All Notifications"
        color="blue"
      />
      <StatCard value={stats?.unreadCount || 0} label="Unread" color="amber" />
    </div>
  );
}
