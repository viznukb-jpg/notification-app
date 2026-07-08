import { Notification } from "@/lib/db";

interface NotificationListItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  isPending: boolean;
}

export function NotificationListItem({ notification, onMarkRead, isPending }: NotificationListItemProps) {
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
        notification.isRead 
          ? "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800" 
          : "bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      }`}
    >
      <div>
        <p className={`text-base font-medium ${notification.isRead ? "text-zinc-700 dark:text-zinc-300" : "text-blue-900 dark:text-blue-100"}`}>
          {notification.title}
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </div>
      {!notification.isRead && (
        <button
          onClick={() => onMarkRead(notification.id)}
          disabled={isPending}
          className="shrink-0 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
        >
          Mark as read
        </button>
      )}
      {notification.isRead && (
        <span className="shrink-0 px-3 py-1 text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded-full">
          Read
        </span>
      )}
    </div>
  );
}
