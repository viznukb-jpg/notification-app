import { randomUUID } from "crypto";

import { User, Notification } from "@/shared/types";

const globalForDb = globalThis as unknown as {
  users: User[];
  notifications: Notification[];
};

const users: User[] = globalForDb.users || [
  { id: "1", name: "Ivan" },
  { id: "2", name: "Maria" },
  { id: "3", name: "Oleksii" },
  { id: "4", name: "Oksana" },
  { id: "5", name: "Dmytro" },
  { id: "6", name: "Kateryna" },
  { id: "7", name: "Andrii" },
];

if (!globalForDb.users) globalForDb.users = users;

const notifications: Notification[] = globalForDb.notifications || [];
if (!globalForDb.notifications) globalForDb.notifications = notifications;

export const db = {
  getUsers: async () => {
    return users;
  },

  getUserNotifications: async (userId: string) => {
    return notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  },

  userExists: async (userId: string) => {
    return users.some((u) => u.id === userId);
  },

  createNotification: async (userId: string, title: string) => {
    if (!users.some((u) => u.id === userId)) return null;

    const newNotification: Notification = {
      id: randomUUID(),
      userId,
      title,
      isRead: false,
      createdAt: Date.now(),
    };
    notifications.push(newNotification);
    return newNotification;
  },

  markAsRead: async (notificationId: string, userId?: string) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification && (!userId || notification.userId === userId)) {
      notification.isRead = true;
      return notification;
    }
    return null;
  },

  getStats: () => {
    return {
      usersCount: users.length,
      notificationsCount: notifications.length,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    };
  },

  getOldUnreadNotifications: (thresholdMs: number) => {
    const now = Date.now();
    return notifications.filter(
      (n) => !n.isRead && now - n.createdAt > thresholdMs,
    );
  },

  getRawNotifications: () => notifications,
  getRawUsers: () => users,
};
