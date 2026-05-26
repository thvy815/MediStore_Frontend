import { type Notification } from "../types/notification";

import { type NotificationObserver } from "./NotificationObserver";

export class NotificationSubject {

  private observers: NotificationObserver[] = [];

  subscribe( observer: NotificationObserver ) {
    this.observers.push(observer);
  }

  unsubscribe( observer: NotificationObserver ) {
    this.observers =
      this.observers.filter(
        o => o !== observer
      );
  }

  notify( notification: Notification ) {
    this.observers.forEach(observer => {

      observer.update(notification);
    });
  }
}

export const notificationSubject = new NotificationSubject();