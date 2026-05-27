import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { notificationSubject } from "@/observer/NotificationSubject";
import type { NotificationObserver } from "@/observer/NotificationObserver";
import type { Notification } from "@/types/notification";
import { useAuth } from "@/contexts/AuthContext";
import { notificationService } from "@/services/notificationService";
import { extractOrderCode } from "@/utils/extractOrderCode";

class BellObserver implements NotificationObserver {

  private callback: (notification: Notification) => void;

  constructor(callback: (notification: Notification) => void) {
    this.callback = callback;
  }

  update(notification: Notification) {
    this.callback(notification);
  }
}

export default function NotificationBell() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {

      try {
        const data = await notificationService.getNotificationsByUser(user.id);
        setNotifications(data);

      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();

  }, [user]);  

  // Đánh dấu notification là đã đọc
  const handleMarkAsRead = async (notificationId: string) => {

    try {
      await notificationService.markAsRead(notificationId);

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  // Khi click vào notification, đánh dấu đã đọc và điều hướng đến trang chi tiết đơn hàng nếu có order code
  const handleNotificationClick = async (
    notification: Notification
  ) => {

    await handleMarkAsRead(notification.id);

    setOpen(false);

    const orderCode = extractOrderCode(
      notification.message
    );

    navigate(
      `/customer/orders?highlight=${orderCode || ""}`
    );
  };

  useEffect(() => {

    const observer = new BellObserver((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    notificationSubject.subscribe(observer);

    return () => {
      notificationSubject.unsubscribe(observer);
    };

  }, []);

  // Đếm số lượng notification chưa đọc để hiển thị badge
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => { document.removeEventListener("mousedown", handleClickOutside); };

  }, []);

  return (
    <div ref={dropdownRef} className="relative">

      {/* Bell button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-100 transition"
      >
        <Bell className="text-green-900" />

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[11px] font-semibold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">

          <div className="sticky top-0 z-10 p-3 border-b font-semibold text-green-900 bg-white">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No notifications
            </div>

          ) : (

            notifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition ${
                  !notification.isRead
                    ? "bg-green-50"
                    : ""
                }`}
              >

                <div className="font-medium text-sm">
                  {notification.title}
                </div>

                <div className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </div>

              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}