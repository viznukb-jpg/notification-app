import { db } from "@/lib/db";
import { UserList } from "@/features/users/UserList";

export default async function HomePage() {
  const users = await db.getUsers();

  return (
    <main className="flex-1 mx-auto p-8 pt-16 w-full max-w-5xl">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="mb-4 font-extrabold text-zinc-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Notification Center
        </h1>
        <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-300 text-lg">
          Manage and view notifications across all registered users in the
          platform. Select a profile below to continue.
        </p>
      </div>

      <UserList users={users} />
    </main>
  );
}
