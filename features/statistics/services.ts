import { AppStatistics } from "@/shared/types";

export async function getAppStatistics(): Promise<AppStatistics | null> {
  try {
    const res = await fetch("/api/statistics");
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error("[Statistics Service] Failed to fetch stats from API", error);
  }
  
  return null;
}
