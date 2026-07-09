import { Notification } from "@/shared/types";

interface NotificationListItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  isPending: boolean;
}

export function NotificationListItem({
  notification,
  onMarkRead,
  isPending,
}: NotificationListItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
        notification.isRead
          ? "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
          : "bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      }`}
    >
      <div>
        <p
          className={`text-base font-medium ${notification.isRead ? "text-zinc-700 dark:text-zinc-300" : "text-blue-900 dark:text-blue-100"}`}
        >
          {notification.title}
        </p>
        <p className="mt-1 text-zinc-500 text-xs">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </div>
      {!notification.isRead && (
        <button
          onClick={() => onMarkRead(notification.id)}
          disabled={isPending}
          className="bg-white hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:opacity-50 px-3 py-1.5 border border-blue-200 dark:border-blue-800 rounded-lg font-medium text-blue-600 dark:text-blue-400 text-sm transition-colors shrink-0"
        >
          Mark as read
        </button>
      )}
      {notification.isRead && (
        <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full font-medium text-zinc-500 text-xs shrink-0">
          Read
        </span>
      )}
    </div>
  );
}
