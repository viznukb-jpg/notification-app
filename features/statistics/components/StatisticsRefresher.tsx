"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RUN_INTERVAL_MS } from "@/shared/config/constants";

export function StatisticsRefresher() {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      router.refresh();
    }, RUN_INTERVAL_MS);

    return () => clearInterval(id);
  }, [router]);

  return null;
}
