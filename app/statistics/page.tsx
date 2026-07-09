import { PageHeader } from "@/shared/ui/PageHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { RUN_INTERVAL_MS } from "@/shared/config/constants";
import { StatisticsContainer } from "@/features/statistics/components/StatisticsContainer";
import { StatisticsRefresher } from "@/features/statistics/components/StatisticsRefresher";

export default function StatisticsPage() {
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

      <StatisticsRefresher />
      <StatisticsContainer />
    </main>
  );
}
