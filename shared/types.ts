export interface User {
  id: string;
  name: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  isRead: boolean;
  createdAt: number;
}

export interface AppStatistics {
  usersCount: number;
  notificationsCount: number;
  unreadCount: number;
}
