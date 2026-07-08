import { db } from "@/lib/db";
import { NotificationsContainer } from "@/features/users/components/NotificationsContainer";
import { notFound } from "next/navigation";
import { PageHeader } from "@/shared/ui/PageHeader";
import { BackButton } from "@/shared/ui/BackButton";

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
      <div>
        <BackButton href="/" label="Back to users" />
        <PageHeader title={`${user.name}'s Notifications`} centered={false} />
      </div>

      <NotificationsContainer userId={user.id} />
    </main>
  );
}
