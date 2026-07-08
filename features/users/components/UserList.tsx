import { User } from "@/shared/types";
import { UserItem } from "./UserItem";

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="flex flex-col gap-3 bg-zinc-50/50 dark:bg-zinc-950/50 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-[60vh] overflow-y-auto">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
