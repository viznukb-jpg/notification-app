import Link from "next/link";
import { User } from "@/lib/db";

interface UserItemProps {
  user: User;
}

export function UserItem({ user }: UserItemProps) {
  return (
    <Link
      href={`/users/${user.id}`}
      className="group relative flex justify-between items-center bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md p-4 border border-zinc-200 hover:border-blue-500 dark:border-zinc-800 dark:hover:border-blue-500 rounded-xl transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 font-bold text-blue-600 dark:text-blue-400 text-lg shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-tight">
            {user.name}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs">
            ID: {user.id}
          </p>
        </div>
      </div>
      <div className="flex items-center font-medium text-blue-600 dark:text-blue-400 text-sm transition-transform group-hover:translate-x-1 duration-200 shrink-0">
        View
        <svg
          className="ml-1 w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
