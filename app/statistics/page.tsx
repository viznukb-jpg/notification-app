import { PageHeader } from "@/shared/ui/PageHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { StatCard } from "@/features/statistics/components/StatCard";
import { RUN_INTERVAL_MS } from "@/shared/config/constants";

import { getAppStatistics } from "@/features/statistics/services";

export default async function StatisticsPage() {
  const stats = await getAppStatistics();

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
        <StatCard
          value={stats?.unreadCount || 0}
          label="Unread"
          color="amber"
        />
      </div>
    </main>
  );
}
