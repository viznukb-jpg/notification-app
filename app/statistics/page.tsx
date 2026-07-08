import { redis } from "@/lib/redis";
import { PageHeader } from "@/shared/ui/PageHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { StatCard } from "@/features/statistics/components/StatCard";
import { RUN_INTERVAL_MS } from "@/shared/config/constants";

import { AppStatistics } from "@/shared/types";

export default async function StatisticsPage() {
  let stats: AppStatistics | null = null;

  try {
    const statsJson = await redis.get("app:statistics");
    if (statsJson) {
      stats = JSON.parse(statsJson) as AppStatistics;
    }
  } catch (error) {
    console.error("[Statistics Page] Failed to fetch stats from Redis", error);
  }

  return (
    <main className="flex-1 mx-auto p-8 pt-16 w-full max-w-5xl">
      <div className="flex flex-col items-center">
        <BackButton href="/" label="Back to Home" centered={true} />
        <PageHeader
          title="System Statistics"
          description={`Real-time analytics updated every ${RUN_INTERVAL_MS / 1000} seconds by the background worker.`}
          centered={true}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
        <StatCard value={stats?.usersCount || 0} label="Total Users" color="blue" />
        <StatCard value={stats?.notificationsCount || 0} label="All Notifications" color="blue" />
        <StatCard value={stats?.unreadCount || 0} label="Unread" color="amber" />
      </div>
    </main>
  );
}
