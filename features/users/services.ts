import { Notification } from "@/shared/types";

export async function getUserNotifications(
  userId: string,
): Promise<Notification[]> {
  const res = await fetch(`/api/users/${userId}/notifications`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function createNotification(
  userId: string,
  title: string,
): Promise<Notification> {
  const res = await fetch(`/api/users/${userId}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create notification");
  return res.json();
}

export async function markNotificationAsRead(
  userId: string,
  notificationId: string,
): Promise<Notification> {
  const res = await fetch(
    `/api/users/${userId}/notifications/${notificationId}`,
    {
      method: "PATCH",
    },
  );
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
}
