"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "@/shared/types";
import { NotificationForm } from "./NotificationForm";
import { NotificationsList } from "./NotificationsList";

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
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/notifications`);
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to create notification");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await fetch(
        `/api/users/${userId}/notifications/${notificationId}`,
        {
          method: "PATCH",
        },
      );
      if (!res.ok) throw new Error("Failed to mark as read");
      return res.json();
    },
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
