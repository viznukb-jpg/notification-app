import { db } from "@/lib/db";
import { NotificationsContainer } from "@/features/users/NotificationsContainer";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const users = await db.getUsers();
  const user = users.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  return (
    <main className="flex-1 mx-auto p-8 pt-16 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link
            href="/"
            className="inline-block mb-2 text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            &larr; Back to users
          </Link>
          <h1 className="font-extrabold text-zinc-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
            {user.name}&apos;s Notifications
          </h1>
        </div>
      </div>

      <NotificationsContainer userId={user.id} />
    </main>
  );
}
