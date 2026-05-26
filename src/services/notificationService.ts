import { api } from "@/api/axios";
import type { Notification } from "@/types/notification";

export const notificationService = {

  getNotificationsByUser: async ( userId: string ): Promise<Notification[]> => {

    const response = await api.get(`/notifications/${userId}`);

    return response.data;
  },

  markAsRead: async ( notificationId: string ): Promise<void> => {

    await api.put(`/notifications/${notificationId}/read`);
  },
};