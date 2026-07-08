import Link from "next/link";
import { db } from "@/lib/db";
import { UserList } from "@/features/users/components/UserList";
import { PageHeader } from "@/shared/ui/PageHeader";

export default async function HomePage() {
  const users = await db.getUsers();

  return (
    <main className="flex-1 mx-auto p-8 pt-16 w-full max-w-5xl">
      <PageHeader
        title="Notification Center"
        description="Manage and view notifications across all registered users in the platform. Select a profile below to continue."
        centered={true}
      >
        <Link
          href="/statistics"
          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 px-6 py-2 rounded-lg font-medium text-white dark:text-zinc-900 transition-colors"
        >
          View Statistics
        </Link>
      </PageHeader>

      <UserList users={users} />
    </main>
  );
}
