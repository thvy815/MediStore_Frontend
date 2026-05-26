import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ChatMessage } from "@/types/chat";
import { notificationSubject } from "@/observer/NotificationSubject";

let stompClient: Client | null = null;
let notificationSubscription: any = null;
let isConnected = false;

const connectSocket = () => {
  if (stompClient && isConnected) return;

  const token = localStorage.getItem("accessToken");

  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_URL}/ws-chat`),

    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WebSocket connected");
      isConnected = true;
    },

    onDisconnect: () => {
      isConnected = false;
    },

    onWebSocketError: (error) => {
      console.error("❌ WebSocket error:", error);
    },

    onStompError: (frame) => {
      console.error("❌ STOMP error:", frame);
    },
  });

  stompClient.activate();
};

export const webSocketService = {

  connectChat: (sessionId: string, onMessageReceived: (message: ChatMessage) => void) => {
    connectSocket();

    const waitConnection = setInterval(() => {
      if (!stompClient?.connected) return;

      clearInterval(waitConnection);

      stompClient.subscribe(`/topic/chat/${sessionId}`, (message) => {
        console.log("📩 Chat:", message.body);
        onMessageReceived(JSON.parse(message.body));
      });

    }, 300);
  },

  connectNotification: (userId: string) => {
    connectSocket();

    const waitConnection = setInterval(() => {
      if (!stompClient?.connected) return;

      clearInterval(waitConnection);

      notificationSubscription = stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        console.log("🔔 Notification:", message.body);

        const notification = JSON.parse(message.body);

        notificationSubject.notify(notification);
      });

    }, 300);
  },

  disconnectNotification: () => {
    notificationSubscription?.unsubscribe();
  },

  disconnect: () => {
    stompClient?.deactivate();
    stompClient = null;
    isConnected = false;
  },
};