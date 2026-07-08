import Link from "next/link";
import { db } from "@/lib/db";

export default async function HomePage() {
  const users = await db.getUsers();

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-8 pt-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl mb-4">
          Notification Center
        </h1>
        <p className="text-lg text-zinc-600 max-w-2xl">
          Manage and view notifications across all registered users in the platform. Select a profile below to continue.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="group relative flex flex-col items-start justify-between p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-1">{user.name}</h2>
              <p className="text-sm text-zinc-500">ID: {user.id}</p>
            </div>
            <div className="relative z-10 mt-6 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
              View notifications
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
