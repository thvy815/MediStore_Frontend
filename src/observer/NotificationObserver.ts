import { type Notification } from "@/types/notification";

export interface NotificationObserver {

  update(notification: Notification): void;
}