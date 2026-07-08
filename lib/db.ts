import { randomUUID } from "crypto";

export type User = {
  id: string;
  name: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  isRead: boolean;
  createdAt: number;
};

const globalForDb = globalThis as unknown as {
  users: User[];
  notifications: Notification[];
};

export const users: User[] = globalForDb.users || [
  { id: "1", name: "Ivan" },
  { id: "2", name: "Maria" },
  { id: "3", name: "Oleksii" },
];
if (!globalForDb.users) globalForDb.users = users;

export const notifications: Notification[] = globalForDb.notifications || [];
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

  createNotification: async (userId: string, title: string) => {
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

  markAsRead: async (notificationId: string) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
    return notification;
  },

  getRawNotifications: () => notifications,
  getRawUsers: () => users,
};
