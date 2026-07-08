import { Notification } from "@/shared/types";
import { NotificationListItem } from "./NotificationListItem";

interface NotificationsListProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  pendingMarkReadId: string | null;
}

export function NotificationsList({
  notifications,
  onMarkRead,
  pendingMarkReadId,
}: NotificationsListProps) {
  return (
    <div>
      <h3 className="mb-4 font-bold text-zinc-900 dark:text-white text-xl">
        Recent Notifications
      </h3>
      {!notifications || notifications.length === 0 ? (
        <p className="text-zinc-500 italic">No notifications yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => (
            <NotificationListItem
              key={notif.id}
              notification={notif}
              onMarkRead={onMarkRead}
              isPending={pendingMarkReadId === notif.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
