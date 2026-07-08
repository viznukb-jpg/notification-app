"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "@/shared/types";
import { NotificationForm } from "./NotificationForm";
import { NotificationsList } from "./NotificationsList";

import {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
} from "../services";

interface NotificationsContainerProps {
  userId: string;
}

export function NotificationsContainer({
  userId,
}: NotificationsContainerProps) {
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications(userId),
  });

  const createMutation = useMutation({
    mutationFn: (title: string) => createNotification(userId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(userId, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  if (isLoading) {
    return (
      <div className="text-zinc-500 animate-pulse">
        Loading notifications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load notifications. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <NotificationForm
        onSubmit={(title) => createMutation.mutate(title)}
        isPending={createMutation.isPending}
      />

      <NotificationsList
        notifications={notifications || []}
        onMarkRead={(id) => markReadMutation.mutate(id)}
        isMarkingRead={markReadMutation.isPending}
      />
    </div>
  );
}
